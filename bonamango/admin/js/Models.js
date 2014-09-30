
var Models = {
    login: function(){
        var email = $('#login-email').val();
        var password = $('#login-password').val();
        Data.fb.child('users')
            .once('value', function(snap) {
                var staff = snap.val();
                $.each(staff,function(key, val){
                    if (val.email == email && val.password == password) {
                        App.userRole = 'admin';
                        $('#main').show();
                        $('#login').fadeOut();
                        $('#loginModal').modal('hide');
                        App.router.setRoute('/restaurants/list');
                    }
                });
                if (!App.userRole) {
                    $('#login-error').show();
                }
            });
        return false;
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
                    delivery: ($('#menu-item-delivery').val()=='on'?1:0),
                }, sectionKey, function(snap){
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
            var ref = Data.fb.child('menuSections')
                .startAt(key)
                .endAt(key);
            ref.once('value', function(snap) {
                    var sections = snap.val();
                    callback(sections);
                    if(sections) {
                        $.each(sections, function(key, el){
                            var menuRef = Data.fb.child('menuItems')
                                .startAt(key)
                                .endAt(key);
                            menuRef.once('value', function(snap) {

                                console.log($('#menu-section-items-'+key))
                                if (snap) {
                                    $('#menu-section-items-'+key).html(Templates.restaurantMenuSectionItems({
                                        key: key,
                                        items: snap.val()
                                    }));
                                }
                            });

                            menuRef.on('child_added', function (snap) {
                                if ($('#menu-section-'+key+' tbody').length) {
                                    $('#menu-section-'+key+' tbody').append(
                                        '<tr id="menu-section-item-'+key+'">'+
                                        '<td>'+snap.val().name+'</td>'+
                                        '<td>'+snap.val().ingredients+'</td>'+
                                        '<td>'+snap.val().variants+'</td>'+
                                        '<td>'+snap.val().prices+'</td>'+

                                        '<td>'+
                                        '<div class="btn-group btn-group-sm">'+
                                            '<button class="btn btn-success" onclick="Models.menuItem.edit(\''+snap.name()+'\')">Edit</button>'+
                                            '<button class="btn" onclick="Models.menuItem.remove(\''+snap.name()+'\')">Remove</button>'+
                                        '</div>'+
                                        '</td>'+
                                        '</tr>'
                                    );
                                } else {
                                    var items = {};
                                    items[snap.name()] = snap.val();
                                    $('#menu-section-items-'+key).html(Templates.restaurantMenuSectionItems({
                                        key: key,
                                        items: items
                                    }));
                                }
                            });

                            menuRef.on('child_changed', function (snap) {
                                $('#menu-section-item-'+snap.name()).replaceWith(
                                    '<tr id="menu-section-item-'+snap.name()+'">'+
                                        '<td>'+snap.val().name+'</td>'+
                                        '<td>'+snap.val().ingredients+'</td>'+
                                        '<td>'+snap.val().variants+'</td>'+
                                        '<td>'+snap.val().prices+'</td>'+
                                        '<td>'+
                                        '<div class="btn-group btn-group-sm">'+
                                            '<button class="btn btn-success" onclick="Models.menuItem.edit(\''+snap.name()+'\')">Edit</button>'+
                                            '<button class="btn" onclick="Models.menuItem.remove(\''+snap.name()+'\')">Remove</button>'+
                                        '</div>'+
                                        '</td>'+
                                    '</tr>'
                                );
                            });

                            menuRef.on('child_removed', function (snap) {
                                $('#menu-section-item-'+snap.name()).remove();
                            });
                            Events.push(menuRef);
                        });
                    }
                });

            ref.on('child_changed', function (snap) {
                $('#menu-section-name-'+snap.name()).html(snap.val().name);
            });

            ref.on('child_removed', function (snap) {
                $('#menu-section-group-'+snap.name()).remove();
            });
            Events.push(ref);
        },

        getInfo: function(key, callback){
            Data.fb.child('restaurants')
                .startAt(key)
                .endAt(key)
                .once('value', function(snap) {
                    var restaurant = snap.val();
                    restaurant = restaurant[Object.keys(restaurant)[0]];
                    restaurant._id = Object.keys(snap.val())[0];
                    restaurant.mode = 'edit';
                    restaurant.isCreate = false;
                    callback(restaurant);
                });
        },
        list: function(){
            var ref = Data.fb.child('restaurants');
            var prepareElement =  function(snapshot){
                var message = snapshot.val();
                message.isActive = (message.status == 'active');
                message._id = snapshot.name();
                return message;
            };
            ref.on('child_added', function (snapshot) {
                $('.preloader').hide();
                var message = prepareElement(snapshot);
                $('#restaurantList').find('tbody').append(Templates.restaurantListElement(message));
                $('.footable').data('footable').redraw();
            });

            ref.on('child_changed', function (snapshot) {
                var message = prepareElement(snapshot);
                $('#restaurantListElement-'+snapshot.name()).replaceWith(Templates.restaurantListElement(message));
                $('.footable').data('footable').redraw();
            });

            ref.on('child_removed', function (snapshot) {
                $('#restaurantListElement-'+snapshot.name()).slideUp(400, function(){
                    $(this).remove();
                    $('.footable').data('footable').redraw();
                })
            });
            Events.push(ref);
        },
        update: function(restaurantId) {
            var newRecord = Data.fb.child('restaurants/'+restaurantId);
            newRecord.update({
                name: $('#edit-rest-name').val(),
                address: $('#edit-rest-address').val(),
                lat: $('#edit-rest-lat').val(),
                lon: $('#edit-rest-lon').val(),
                description: $('#edit-rest-description').val()
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

            var createRestaurant =  function(userId) {
                var restaurantKey = ($('#add-rest-name').val()).toLowerCase().replace(' ', '');
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
    }
};