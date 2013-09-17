<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


if (!defined('NL_TEXT_DIR')) {
    define('NL_TEXT_DIR', dirname(__FILE__));
}

require_once NL_TEXT_DIR . '/NeatlineTextPlugin.php';

$text = new NeatlineTextPlugin();
$text->setUp();
