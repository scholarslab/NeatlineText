<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     neatline
 * @subpackage  texts
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineNarrative_Case_Default extends Neatline_Case_Abstract
{


    /**
     * Bootstrap the plugin.
     */
    public function setUp()
    {

        parent::setUp();

        // Authenticate and set the current user.
        $this->user = $this->db->getTable('User')->find(1);
        $this->_authenticateUser($this->user);

        // Install Neatline and NeatlineNarrative.
        $pluginHelper = new Omeka_Test_Helper_Plugin;
        $pluginHelper->setUp('Neatline');
        $pluginHelper->setUp('NeatlineNarrative');

        // Get plugin tables.
        $this->_exhibits = $this->db->getTable('NeatlineExhibit');
        $this->_records  = $this->db->getTable('NeatlineRecord');

    }


    /**
     * Get the Jasmine fixtures directory.
     *
     * @return string The directory.
     */
    protected function _getFixturesPath()
    {
        return NL_NARRATIVE_DIR . '/tests/jasmine/fixtures/';
    }


}
