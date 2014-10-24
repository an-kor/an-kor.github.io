
var Models = {
    availableRestaurants: [],
    login: function(email, password, stored){
        if (!email) {
            var email = $('#login-email').val();
            var password = $('#login-password').val();
            var stored = 0;
        } else {
            var stored = 1;
        }
        var rememberMe = $('#remember-me').val();
        Data.fb.child('users')
            .once('value', function(snap) {
                var staff = snap.val();
                $.each(staff,function(key, val){
                    if (val.email == email && val.password == password) {
                        if (rememberMe == 'on') {
                            localStorage.setItem('email', email);
                            localStorage.setItem('password', password);
                        }
                        /*if (val.email == "niklas@juiceverket.se") {
                            App.userRole = 'juiceverket';
                        } else {
                            App.userRole = 'admin';
                        }*/
                        if (val.role == 'admin') {
                            App.userRole = val.role;
                        } else {
                            App.userRole = 'manager';
                        }
                        $('#main').show();
                        $('#login').fadeOut();
                        $('#loginModal').modal('hide');
                        if (stored) {
                            App.router.init('/staff-dashboard');
                            //Pages.staffDashboard();
                            $('.modal-backdrop').hide();
                        } else {
                            App.router.setRoute('/staff-dashboard');
                        }
                    }
                });
                if (!App.userRole) {
                    App.router.setRoute('/login');
                    $('#login-error').show();
                }
            });
        return false;
    },
    ordersStaff: {
        cache: {},
        changeStatus: function(key, status){
            var val = $('#order-preparation').val();
            var comment = $('#order-comment').val();
            var newRecord = Data.fb.child('orders/'+key);
            var update = {
                preparationTime: val,
                comment: comment
            };
            if (status) {
                update.status = status
            }
            newRecord.update(update, function(){
                $("#product-modal").modal('hide');
            });
        },
        prepareElement: function (k, order) {
            var prepareCart = function (cart) {
                var result = [];
                $.each(cart, function(k, el){
                    if (el) {
                        result.push(el.name + " " + el.price + "kr")
                    }
                });
                return result.join("; ")
            };
            var date = new Date(order.created_at);
            var order_time = date;
            var preorder_time = 0;
            if (order.preorder_time) {
                preorder_time = new Date(order.preorder_time);
                console.log(order.id);
            }
            var result = {
                "_id": k,
                "id": order.id,
                "created_at": date.toString().substr(16,5)+" "+date.getDate()+"/"+(date.getMonth()+1),
                "created_at_raw": date.getTime(),
                "order_time": order_time.toString().substr(16,5)+" "+order_time.getDate()+"/"+(order_time.getMonth()+1),
                "preorder_time": (preorder_time)?preorder_time.toString().substr(16,5)+" "+preorder_time.getDate()+"/"+(preorder_time.getMonth()+1):0,
                "customerPhone": order.customerPhone,
                "restaurantTitle": order.restaurantTitle,
                "cartString": prepareCart(order.cart),
                "total": order.total,
                "customer": order.customerName,
                "comment": order.comment,
                "payment": (order.payment=="card"?"By card":"By cash"),
                "delivery": (order.delivery=="pickup"?"Pick up":"Seating"),
                "isConfirmed": (order.status=="confirmed"?1:0),
                "isRejected": (order.status=="rejected"?1:0),
                "isCancelled": (order.status=="cancelled"?1:0),
                "isCompleted": (order.status=="completed"?1:0),
                "isPending": (order.status=="waiting"?1:0)
            };
            return result;
        },
        showOrderModal: function(key){
            var ref = Data.fb.child('orders/'+key);
            ref.once('value', function (snapshot) {
                var order = snapshot.val();
                console.log(order);
                var order_time = new Date(order.created_at);
                $('#order-number').html(order.id);
                $('#order-restaurant').html(order.restaurantTitle);
                $('#order-created').html(order_time.toString().substr(16,5)+" "+order_time.getDate()+"/"+(order_time.getMonth()+1));
                $('#order-c-phone').html(order.customerPhone);
                $('#order-c-name').html(order.customerName);
                $('#order-delivery').html(order.delivery);
                $('#order-payment').html(order.payment);
                if (order.preparationTime) {
                    $('#order-preparation').val(order.preparationTime);
                }
                $('#order-comment').val('');
                if (order.comment) {
                    $('#order-comment').val(order.comment);
                }
                if (!order.preorder_time || order.preorder_time == order.created_at ) {
                    $('#order-booked-div').hide();
                } else {
                    $('#order-booked-div').show();
                    var preorder_time = new Date(order.preorder_time);
                    $('#order-booked').html(preorder_time.toString().substr(16,5)+" "+preorder_time.getDate()+"/"+(preorder_time.getMonth()+1));
                }
                $("#order-items").empty();
                $.map(order.cart, function(el){
                    if (el) {
                        $("#order-items").append('<li>' + el.name + ' <i>' + el.price + 'kr</i></li>')
                    }
                });
                $('#order-btn-pending, #order-btn-confirmed, #order-btn-completed, #order-btn-rejected, #order-save').attr('data-key', key);
                $('#order-btn-pending, #order-btn-confirmed, #order-btn-completed, #order-btn-rejected').hide();
                if (order.status == 'waiting') {
                    $('#order-btn-confirmed, #order-btn-rejected').show();
                }
                if (order.status == 'confirmed') {
                    $('#order-btn-pending, #order-btn-completed, #order-btn-rejected').show();
                }
                if (order.status == 'rejected') {
                    $('#order-btn-pending, #order-btn-confirmed').show();
                }

                if (order.status == 'waiting') order.status = 'pending';
                $('#order-status').html(order.status);

                $('#order-total').html(order.total);

                if (order.discount) {
                    $('#order-discount-div').show();
                    $('#order-discount').html(order.discount);
                } else {
                    $('#order-discount-div').hide();
                }

                $("#product-modal").modal('show');
            });
        },
        list: function(){
            var ref = Data.fb.child('orders').limit(500);
            ref.once('value', function (snapshot) {
                var orders = snapshot.val();
                var pendingCount = 0;
                var count = 0;
                var sum = 0;
                $.each(orders, function(k, order){
                    if (order.status!='cancelled' && $.inArray(order.restaurant, Models.availableRestaurants)>-1) {
                        if (!$('#ordersListElement-' + k).length){
                            count++;
                            if (order.status=="completed") sum += parseInt(order.total);
                            if (order.status=="waiting") pendingCount++;
                            $('#ordersList').find('tbody').prepend(Templates.ordersListStaffElement(Models.ordersStaff.prepareElement(k, order)));
                        }
                    }
                });
                Utils.sortTable();
                $('#ordersList').on('click', 'tbody tr', function(){
                    Models.ordersStaff.showOrderModal($(this).attr('data-id'));
                });
                $('.pendingCount').html(pendingCount);
                $('.ordersCount').html(count);
                $('.ordersSum').html(sum);
            });


            if (!Events['orders']) {
                ref.once('value', function (snapshot) {
                    var pendingCount = 0;
                    var count = 0;
                    var sum = 0;
                    var orders = snapshot.val();
                    $.each(orders, function(k, order){
                        if (order.status!='cancelled' && $.inArray(order.restaurant, Models.availableRestaurants)>-1) {
                            count++;
                            if (order.status=="completed") sum += parseInt(order.total);
                            if (order.status=="waiting") pendingCount++;
                        }
                    });
                    $('.pendingCount').html(pendingCount);
                    $('.ordersCount').html(count);
                    $('.ordersSum').html(sum);
                    Models.ordersStaff.firstRun = new Date().getTime();
                });

                ref.on('child_added', function (snapshot) {
                    if (location.hash == "#/staff-dashboard") {
                        var k = snapshot.name();
                        var order = snapshot.val();
                        Models.ordersStaff.cache[k] = order;
                        if (order.status!='cancelled' && $.inArray(order.restaurant, Models.availableRestaurants)>-1) {
                            if (!$('#ordersListElement-' + k).length) {
                                $('#ordersList').find('tbody').prepend(Templates.ordersListStaffElement(Models.ordersStaff.prepareElement(k, order)));
                                Utils.sortTable();
                            }
                        }

                        if (order.status=='waiting' && ((new Date().getTime()) - Models.ordersStaff.firstRun > 10000)) {
                            Models.ordersStaff.showOrderModal(k);
                        }
                    }
                });

                ref.on('child_changed', function (snapshot) {
                    var order = snapshot.val();
                    if (location.hash == "#/staff-dashboard") {
                        if (order.status != 'cancelled') {
                            $('#ordersListElement-' + snapshot.name()).replaceWith(Templates.ordersListStaffElement(Models.ordersStaff.prepareElement(snapshot.name(), snapshot.val())));
                        } else {
                            $('#ordersListElement-' + snapshot.name()).slideUp(400, function () {
                                $(this).remove();
                            })
                        }
                    }
                });

                ref.on('child_removed', function (snapshot) {
                    if (location.hash == "#/staff-dashboard") {
                        $('#ordersListElement-' + snapshot.name()).slideUp(400, function () {
                            $(this).remove();
                        })
                    }
                });

                Events['orders'] = true;
            }
        }
    },
    orders: {
        cache: {},
        changeStatus: function(key, status){
            if (status == 'confirmed') {
                var val = prompt('Please enter preparation time for the order', 10)
                var newRecord = Data.fb.child('orders/'+key);
                newRecord.update({
                    status: status,
                    preparationTime: val
                }, function(){
                });
            } else {
                var newRecord = Data.fb.child('orders/'+key);
                newRecord.update({
                    status: status
                }, function(){
                    $("#product-modal").modal('hide');
                    //Models.orders.cache[key].status = status;
                    //$('#ordersListElement-' + key).replaceWith(Templates.ordersListElement(Models.orders.prepareElement(key, Models.orders.cache[key])));
                    //$('.footable').data('footable').redraw();
                });
            }
        },
        prepareElement: function (k, order) {
            var prepareCart = function (cart) {
                var result = [];
                $.each(cart, function(k, el){
                    result.push(el.name + " " + el.price + "kr")
                });
                return result.join("; ")
            };
            var result = {
                "_id": k,
                "id": order.id,
                "customerPhone": order.customerPhone,
                "restaurantTitle": order.restaurantTitle,
                "cartString": prepareCart(order.cart),
                "total": order.total,
                "customer": order.customerName,
                "comment": order.comment,
                "payment": (order.payment=="card"?"By card":"By cash"),
                "delivery": (order.delivery=="pickup"?"Pick up":"Seating"),
                "isConfirmed": (order.status=="confirmed"?1:0),
                "isRejected": (order.status=="rejected"?1:0),
                "isCancelled": (order.status=="cancelled"?1:0),
                "isCompleted": (order.status=="completed"?1:0),
                "isPending": (order.status=="waiting"?1:0)
            };
            return result;
        },
        list: function(){
            console.log('orders')
            var ref = Data.fb.child('orders').limit(500);

            ref.once('value', function (snapshot) {
                var orders = snapshot.val();
                console.log(orders);
                var pendingCount = 0;
                var count = 0;
                var sum = 0;
                //Models.availableRestaurants
                $.each(orders, function(k, order){
                    if ($.inArray(order.restaurant, Models.availableRestaurants)>-1) {
                        if (!$('#ordersListElement-' + k).length){
                            count++;
                            if (order.status=="completed") sum += parseInt(order.total);
                            if (order.status=="waiting") pendingCount++;
                            $('#ordersList').find('tbody').prepend(Templates.ordersListElement(Models.orders.prepareElement(k, order)));
                        }
                    }
                });
                $('.pendingCount').html(pendingCount);
                $('.ordersCount').html(count);
                $('.ordersSum').html(sum);
                $('.footable').data('footable').redraw();
            });

            if (!Events['orders']) {
                ref.once('value', function (snapshot) {
                    var pendingCount = 0;
                    var count = 0;
                    var sum = 0;
                    var orders = snapshot.val();
                    $.each(orders, function(k, order){
                        if ($.inArray(order.restaurant, Models.availableRestaurants)>-1) {
                            count++;
                            if (order.status=="completed") sum += parseInt(order.total);
                            if (order.status=="waiting") pendingCount++;
                        }
                    });
                    $('.pendingCount').html(pendingCount);
                    $('.ordersCount').html(count);
                    $('.ordersSum').html(sum);
                });

                ref.on('child_added', function (snapshot) {
                    if (location.hash == "#/dashboard") {
                        var k = snapshot.name();
                        var order = snapshot.val();
                        Models.orders.cache[k] = order;
                        if ($.inArray(order.restaurant, Models.availableRestaurants)>-1) {
                            if (!$('#ordersListElement-' + k).length) {
                                $('#ordersList').find('tbody').prepend(Templates.ordersListElement(Models.orders.prepareElement(k, order)));
                            }
                        }
                        $('.footable').data('footable').redraw();
                    }
                });

                ref.on('child_changed', function (snapshot) {
                    if (location.hash == "#/dashboard") {
                        $('#ordersListElement-' + snapshot.name()).replaceWith(Templates.ordersListElement(Models.orders.prepareElement(snapshot.name(), snapshot.val())));
                        $('.footable').data('footable').redraw();
                    }
                });

                ref.on('child_removed', function (snapshot) {
                    if (location.hash == "#/dashboard") {
                    $('#ordersListElement-' + snapshot.name()).slideUp(400, function () {
                        $(this).remove();
                        $('.footable').data('footable').redraw();
                    })
                    }
                });

                Events['orders'] = true;
            }
        }
    },
    menuSection: {
        create: function(){
            var restaurantKey = $('#restaurant-key').val();
            var name = $('#new-section-input').val();
            var newRecord = Data.fb.child('menuSections').push();
            newRecord.setWithPriority({
                name: name
            }, restaurantKey, function(){
                Models.restaurant.getMenu(restaurantKey, function(sections){
                    $('#menu-sections').html(Templates.restaurantMenuSections(sections))
                    $("#new-section-modal").modal('hide');
                })
            });
        },
        prepareUpdate: function(key){
            $('#menu-section-name-'+key).html('<input id="menu-section-input-name-'+key+'" value="'+$('#menu-section-name-'+key).html()+'" /> <button class="btn btn-primary" onclick="Models.menuSection.update(\''+key+'\')">OK</button>')
        },
        update: function(key){
            var newRecord = Data.fb.child('menuSections/'+key);
            newRecord.update({
                name: $('#menu-section-input-name-'+key).val()
            }, function(){
                $('#menu-section-name-'+key).html($('#menu-section-input-name-'+key).val());
            });
        },
        remove: function(key){
            var newRecord = Data.fb.child('menuSections/'+key);
            newRecord.remove();
            $('#menu-section-group-'+key).remove();
        }
    },
    staff: {
        validate: function(){
            var passed = true;
            $.map(['#staff-add-email', '#staff-add-password'], function(el){
                if (!$(el).val()){
                    passed = false;
                    $(el).closest(".form-group").addClass("has-error");
                } else {
                    $(el).closest(".form-group").removeClass("has-error");
                }
            });
            return passed;
        },
        create: function(){
            var restaurantKey = $('#restaurant-key').val();
            if (Models.staff.validate()) {
                var email = $('#staff-add-email').val();
                var password = $('#staff-add-password').val();
                var newRecord = Data.fb.child('staffMembers').push();
                newRecord.setWithPriority({
                    email: email,
                    password: password
                }, restaurantKey, function(){
                    $('#staffList tbody').append(Templates.staffListElement({email: email, password: password}));
                });
            }
        },
        remove: function(key){
            var newRecord = Data.fb.child('menuSections/'+key);
            newRecord.remove();
            $('#menu-section-group-'+key).remove();
        },
        list: function(key, callback){
            Data.fb.child('staffMembers')
                .startAt(key)
                .endAt(key)
                .once('value', function(snap) {
                    var staff = snap.val();
                    callback(staff);
                });
        }
    },
    menuItem: {
        validate: function(){
            var passed = true;
            $.map(['#menu-item-name', '#menu-item-prices'], function(el){
                if (!$(el).val()){
                    passed = false;
                    $(el).closest(".form-group").addClass("has-error");
                } else {
                    $(el).closest(".form-group").removeClass("has-error");
                }
            });
            return passed;
        },
        create: function(){
            if (Models.menuItem.validate()) {
                var sectionKey = $('#menu-item-section-key').val();
                var newRecord = Data.fb.child('menuItems').push();
                newRecord.setWithPriority({
                    name: $('#menu-item-name').val(),
                    prices: $('#menu-item-prices').val(),
                    ingredients: $('#menu-item-ingredients').val(),
                    variants: $('#menu-item-variants').val(),
                    pickup: ($('#menu-item-pickup').val()=='on'?1:0),
                    delivery: ($('#menu-item-delivery').val()=='on'?1:0)
                }, sectionKey, function(){
                    $("#menu-item-modal").modal('hide');
                });
            }
        },
        edit: function(key){
            $('#modal-dialog-add-btn').hide();
            $('#modal-dialog-edit-btn').show();
            $('#menu-item-key').val(key);
            Data.fb.child('menuItems/'+key).once('value', function(snap) {
                var el = snap.val();
                $('#menu-item-name').val(el.name);
                $('#menu-item-prices').val(el.prices);
                $('#menu-item-ingredients').val(el.ingredients);
                $('#menu-item-variants').val(el.variants);
                $('#menu-item-pickup').val(el.pickup);
                $('#menu-item-delivery').val(el.delivery);
                $('#menu-item-modal').modal('show');
            });
        },
        remove: function(key){
            var newRecord = Data.fb.child('menuItems/'+key);
            newRecord.remove();
        },
        update: function(){
            var key = $('#menu-item-key').val();
            var newRecord = Data.fb.child('menuItems/'+key);
            newRecord.update({
                name: $('#menu-item-name').val(),
                prices: $('#menu-item-prices').val(),
                ingredients: $('#menu-item-ingredients').val(),
                variants: $('#menu-item-variants').val(),
                pickup: ($('#menu-item-pickup').val()=='on'?1:0),
                delivery: ($('#menu-item-delivery').val()=='on'?1:0)
            }, function(){
                $("#menu-item-modal").modal('hide');
                $('#menu-item-name').val('');
                $('#menu-item-prices').val('');
                $('#menu-item-ingredients').val('');
                $('#menu-item-variants').val('');
                $('#menu-item-pickup').val('on');
                $('#menu-item-delivery').val('on');
            });
        }
    },
    restaurant: {
        validate: function(){
            var passed = true;
            $.map(['#add-rest-name', '#add-rest-email'], function(el){
                if (!$(el).val()){
                    passed = false;
                    $(el).closest(".form-group").addClass("has-error");
                } else {
                    $(el).closest(".form-group").removeClass("has-error");
                }
            });
            if (!passed) {
                Utils.showAlert('Name and Manager\'s email are required fields');
            } else {
                Utils.hideAlert();
            }
            return passed;
        },

        getMenu: function(key, callback){
            if (key == 'steam') key = 'testrestaurant';
                var ref = Data.fb.child('menuSections')
                    .startAt(key)
                    .endAt(key);
                ref.once('value', function (snap) {
                    var sections = snap.val();
                    callback(sections);
                    if (sections) {
                        $.each(sections, function (key, el) {
                            var menuRef = Data.fb.child('menuItems')
                                .startAt(key)
                                .endAt(key);
                            menuRef.once('value', function (snap) {
                                if (snap) {
                                    $('#menu-section-items-' + key).html(Templates.restaurantMenuSectionItems({
                                        key: key,
                                        items: snap.val()
                                    }));
                                }
                            });

                            if (!Events['#menu-section-items-' + key]) {
                                menuRef.on('child_added', function (snap) {
                                    if ($('#menu-section-' + key + ' tbody').length) {
                                        $('#menu-section-' + key + ' tbody').append(
                                            '<tr id="menu-section-item-' + key + '">' +
                                            '<td>' + snap.val().name + '</td>' +
                                            '<td>' + snap.val().ingredients + '</td>' +
                                            '<td>' + snap.val().variants + '</td>' +
                                            '<td>' + snap.val().prices + '</td>' +

                                            '<td>' +
                                            '<div class="btn-group btn-group-sm">' +
                                            '<button class="btn btn-success" onclick="Models.menuItem.edit(\'' + snap.name() + '\')">Edit</button>' +
                                            '<button class="btn" onclick="Models.menuItem.remove(\'' + snap.name() + '\')">Remove</button>' +
                                            '</div>' +
                                            '</td>' +
                                            '</tr>'
                                        );
                                    } else {
                                        var items = {};
                                        items[snap.name()] = snap.val();
                                        $('#menu-section-items-' + key).html(Templates.restaurantMenuSectionItems({
                                            key: key,
                                            items: items
                                        }));
                                    }
                                });

                                menuRef.on('child_changed', function (snap) {
                                    $('#menu-section-item-' + snap.name()).replaceWith(
                                        '<tr id="menu-section-item-' + snap.name() + '">' +
                                        '<td>' + snap.val().name + '</td>' +
                                        '<td>' + snap.val().ingredients + '</td>' +
                                        '<td>' + snap.val().variants + '</td>' +
                                        '<td>' + snap.val().prices + '</td>' +
                                        '<td>' +
                                        '<div class="btn-group btn-group-sm">' +
                                        '<button class="btn btn-success" onclick="Models.menuItem.edit(\'' + snap.name() + '\')">Edit</button>' +
                                        '<button class="btn" onclick="Models.menuItem.remove(\'' + snap.name() + '\')">Remove</button>' +
                                        '</div>' +
                                        '</td>' +
                                        '</tr>'
                                    );
                                });

                                menuRef.on('child_removed', function (snap) {
                                    $('#menu-section-item-' + snap.name()).remove();
                                });
                                Events['#menu-section-items-' + key] = true;
                            }
                        });
                    }
                });

                if (!Events['menuSections' + key]) {
                    ref.on('child_changed', function (snap) {
                        $('#menu-section-name-' + snap.name()).html(snap.val().name);
                    });

                    ref.on('child_removed', function (snap) {
                        $('#menu-section-group-' + snap.name()).remove();
                    });
                    Events['menuSections' + key] = true;
                }
        },

        getInfo: function(key, callback){
            Data.fb.child('restaurants')
                .startAt(key)
                .endAt(key)
                .once('value', function(snap) {
                    var restaurant = snap.val();
                    console.log(restaurant);
                    restaurant = restaurant[Object.keys(restaurant)[0]];
                    restaurant._id = Object.keys(snap.val())[0];
                    restaurant.mode = 'edit';
                    restaurant.isCreate = false;
                    callback(restaurant);
                });
        },
        list: function(){

                var ref = Data.fb.child('restaurants');
                var prepareElement = function (k, message) {
                    message.isActive = 1;//(message.status == 'active');
                    message._id = k;
                    return message;
                };
                ref.once('value', function (snapshot) {
                    $('.preloader').hide();
                    var val = snapshot.val();
                    $.each(val, function(k, message){
                        if (App.userRole == 'admin' || message.manager == localStorage.getItem('email')) {
                            message = prepareElement(k, message);
                            if (!$('#restaurantListElement-' + k).length) {
                                $('#restaurantList').find('tbody').append(Templates.restaurantListElement(message));
                            }
                            Models.availableRestaurants.push(message.key);
                        }/* else {
                            var message = prepareElement(k, message);
                            $('#restaurantList').find('tbody').append(Templates.restaurantListElement(message));
                        }*/
                    });
                    $('.footable').data('footable').redraw();
                });

            if (!Events['restaurants']) {
                ref.on('child_changed', function (snapshot) {
                    var message = prepareElement(snapshot);
                    $('#restaurantListElement-' + snapshot.name()).replaceWith(Templates.restaurantListElement(message));
                    $('.footable').data('footable').redraw();
                });

                ref.on('child_removed', function (snapshot) {
                    $('#restaurantListElement-' + snapshot.name()).slideUp(400, function () {
                        $(this).remove();
                        $('.footable').data('footable').redraw();
                    })
                });
                Events['restaurants'] = true;
            }
        },
        update: function(restaurantId) {
            var newRecord = Data.fb.child('restaurants/'+restaurantId);

            var userEmail = $('#edit-rest-email').val();
            var userPassword = $('#edit-rest-password').val();
            Data.fb.child('usersIndex/'+Utils.escapeEmail(userEmail)).once('value', function (snap) {
                if (snap.val() === null) {
                    if (userPassword == "") {
                        $('#edit-rest-password').closest(".form-group").addClass("has-error");
                        Utils.showAlert('User not found, provide the password to create a new one');
                    } else {
                        var newUserRecord = Data.fb.child('users').push({
                            email: userEmail,
                            password: userPassword
                        }, function(){
                            var userId = newUserRecord.name();
                            Data.fb.child('usersIndex/'+Utils.escapeEmail(userEmail)).set(userId);
                        });
                    }
                }
            });
            newRecord.update({
                name: $('#edit-rest-name').val(),
                address: $('#edit-rest-address').val(),
                lat: $('#edit-rest-lat').val(),
                lon: $('#edit-rest-lon').val(),
                description: $('#edit-rest-description').val(),
                manager: $('#edit-rest-email').val()
            }, function(){
                $('#edit-rest-form .alert-success').show();
                setTimeout(function(){
                    $('#edit-rest-form .alert-success').fadeOut();
                }, 3000)
            });
        },
        remove: function(restaurantId) {
            var newRecord = Data.fb.child('restaurants/'+restaurantId);
            newRecord.remove();
            App.router.setRoute('/restaurants/list');
        },
        create: function(){
            var setUserPermissionForRestaurant =  function(userId, restaurantId) {
                Data.fb.child('userRestaurantsLink/'+userId).once('value', function (snap) {
                    if (snap.val() === null) {
                        Data.fb.child('userRestaurantsLink/'+userId).set(restaurantId);
                    } else {
                        var values = snap.val().split(',');
                        if (!$.inArray(restaurantId, values)) {
                            values.push(restaurantId);
                            Data.fb.child('userRestaurantsLink/'+userId).set(values.join(','));
                        }
                    }
                });
            };

            var makeSortString = (function() {
                var translate_re = /[öäüÖÄÜ]/g;
                var translate = {
                    "ä": "a", "ö": "o", "ü": "u",
                    "Ä": "A", "Ö": "O", "Ü": "U"   // probably more to come
                };
                return function(s) {
                    return ( s.replace(translate_re, function(match) {
                        return translate[match];
                    }) );
                }
            })();

            var createRestaurant =  function(userId) {
                var restaurantKey = (makeSortString($('#add-rest-name').val()).toLowerCase()).replace(/[^a-z0-9]/gi,'');
                var newRecord = Data.fb.child('restaurants').push();
                newRecord.setWithPriority({
                    key: restaurantKey,
                    name: $('#add-rest-name').val(),
                    address: $('#add-rest-address').val(),
                    lat: $('#add-rest-lat').val(),
                    lon: $('#add-rest-lon').val(),
                    description: $('#add-rest-description').val(),
                    manager: $('#add-rest-email').val(),
                    status: 'disabled'
                }, restaurantKey, function(){
                    var restaurantId = newRecord.name();
                    setUserPermissionForRestaurant(userId, restaurantId);
                    App.router.setRoute('/restaurants/'+restaurantKey);
                });
            };

            if (Models.restaurant.validate()){
                var userEmail = $('#add-rest-email').val();
                var userPassword = $('#add-rest-password').val();
                Data.fb.child('usersIndex/'+Utils.escapeEmail(userEmail)).once('value', function (snap) {
                    if (snap.val() === null) {
                        if (userPassword == "") {
                            $('#add-rest-password').closest(".form-group").addClass("has-error");
                            Utils.showAlert('User not found, provide the password to create a new one');
                        } else {
                            var newUserRecord = Data.fb.child('users').push({
                                email: userEmail,
                                password: userPassword
                            }, function(){
                                var userId = newUserRecord.name();
                                Data.fb.child('usersIndex/'+Utils.escapeEmail(userEmail)).set(userId);
                                Auth.createUser(userEmail, userPassword, function(error, user) {
                                    if (error === null) {
                                        console.log("User created successfully:", user);
                                    } else {
                                        console.log("Error creating user:", error);
                                    }
                                });
                                createRestaurant(userId);
                            });
                        }
                    } else {
                        createRestaurant(snap.val());
                    }
                });
            }

            //ref.push({ 'title': title, 'parent': parent });
        }
    },
    createUser: function(){
        var email = $('#signup-email').val();
        var password = $('#signup-password').val();

        Data.fb.child('usersIndex/'+Utils.escapeEmail(email)).once('value', function (snap) {
            if (snap.val() === null) {
                $('#signup-error').hide();
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                var newUserRecord = Data.fb.child('users').push({
                    email: email,
                    password: password
                }, function(){
                    var userId = newUserRecord.name();
                    Data.fb.child('usersIndex/'+Utils.escapeEmail(email)).set(userId);
                    Models.login(email, password, 1);
                });
            } else {
                $('#signup-error').show();
            }
        });
    }
};