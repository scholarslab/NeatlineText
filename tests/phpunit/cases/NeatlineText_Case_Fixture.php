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
     * Create exhibit, set `exhibit_id` GET parameter.
     */
    public function setUp()
    {

        parent::setUp();

        // Create mock exhibit.
        $this->exhibit = $this->_exhibit();

        // Set `exhibit_id` GET parameter.
        $this->request->setQuery(array(
            'exhibit_id' => $this->exhibit->id,
        ));

    }


}
