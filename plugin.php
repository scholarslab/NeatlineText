<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     neatline
 * @subpackage  texts
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


if (!defined('NL_NARRATIVE_DIR')) {
    define('NL_NARRATIVE_DIR', dirname(__FILE__));
}

require_once NL_NARRATIVE_DIR . '/NeatlineNarrativePlugin.php';

$narrative = new NeatlineNarrativePlugin();
$narrative->setUp();
