<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'homenet');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '486246');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'I;NZvF.Z>4hX#Gqt(ePx1DX5wiNL+e-/$tk6m*>Y9l1^7{EmB&waK74$,z-Bal/x');
define('SECURE_AUTH_KEY',  '[PD,F`z!LFTI8_$`7|$NsYc5pDB*p 8wT$(xb!/0o-G NOEGWvZd7xgbtQI]9q6f');
define('LOGGED_IN_KEY',    'S<+4eN>t&C*A}@DvZ?NejX#PM%JT^C3un5KynY0F+YZ%R gIrXex|L*4<AM&p](H');
define('NONCE_KEY',        '=EeL=wC}ug{%Yxf(c.+k-E_<~x<-krY>&cCgv3b1ALyw^;g0ZRxL?<;4zhL#a|z*');
define('AUTH_SALT',        'WE1W=[tc/!P4[9fdK=mL6GF-OP1F3fg#Ng(?)eq*i +kXh.G(G8d~yo7Kz9st,[b');
define('SECURE_AUTH_SALT', 'ND<($SKQya[h=thuG*m#+3Jk!<{7ghoWnK-p-+(aIe>{)6),6}A0cp*d$^n$|AJx');
define('LOGGED_IN_SALT',   '=f.Wd/jGC8FlC?A`|/|eg$FZM,@{dE(GY?OzoxBQz|A!Lm`lHzXO-Mx.-,F2NgDa');
define('NONCE_SALT',       'Z==PL`9+yL|EU!c#=8F{Y[b`j&4Hz,4*&k)Ou%9q#QVx7-{%D2m.O!KOyQnv>O]/');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'hn_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);
define('FS_METHOD', 'direct');

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
