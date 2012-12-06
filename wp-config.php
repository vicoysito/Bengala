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
define('DB_NAME', 'bengala');

/** MySQL database username */
define('DB_USER', 'bengalaUser');

/** MySQL database password */
define('DB_PASSWORD', '23121984');

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
define('AUTH_KEY',         'oNusSZJ>#+4rNj_+7OR<;`nWp||OYVq|:x3z9 0,*F64G+@x_.vLS)#FwayJ0VTX');
define('SECURE_AUTH_KEY',  '-7++21MAd7W~qB^&KV1#,,:G8ji$<T1|=:J7;f5&)a?K%_(B4Ozg1oVu#),4.v#O');
define('LOGGED_IN_KEY',    'M|Z3puyHv|;TF;mDp:a<+5l6/]$A&v!z|{h|QcX-s#sSf:a_Z{j$h.cIXE-/Nzga');
define('NONCE_KEY',        '2M{x|$~]AG8MY@-pIx+Zr6Su;+vbkg/Uht]xT9p@*M|ju!:B9f||[=C;B5S%r-fb');
define('AUTH_SALT',        'q-W v~r|L) mY@L(mbM|ewK{,s/q4y.~mK<yV^<J43AZ_(!a_|36Ab;XB$,}<,-}');
define('SECURE_AUTH_SALT', 'N+e3(Kgk5 c=7G+HS@dr5|y|3$_nE(TdRf9FLJw:0cet+ :z.50~|G7g3.Xdr.G9');
define('LOGGED_IN_SALT',   ']JE#lp!JvKw=zN#UPrLK@K?Bs^$#<w{@)Rw!Xhp+|EsPQ~|r4Cqz_hf<&B|EQ-W!');
define('NONCE_SALT',       'qP+^M:o/NV+H=PUMU%z@oMMDk*[VsZrQxH]agn-7R[c,G]w.mL2pTi6`5ewjwj<Z');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

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

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
