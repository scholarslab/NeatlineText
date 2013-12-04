<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineText_Case_Fixture extends NeatlineText_Case_Default
{


    protected $_isAdminTest = false;


    /**
     * Create a mock exhibit.
     */
    public function setUp()
    {
        parent::setUp();
        $this->exhibit = $this->_exhibit();
    }


    /**
     * Get the Jasmine fixtures directory.
     *
     * @return string The directory.
     */
    protected function _getFixturesPath()
    {
        return NL_TEXT_DIR . '/tests/jasmine/fixtures/';
    }


}
