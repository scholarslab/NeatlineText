<?php

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


define('NL_TEXT_DIR', dirname(dirname(dirname(__FILE__))));

// Load Neatline testing bootstrap.
require_once NL_TEXT_DIR.'/Neatline/tests/phpunit/bootstrap.php';

// Load test cases.
require_once 'cases/NeatlineText_Case_Default.php';
require_once 'cases/NeatlineText_Case_Fixture.php';
