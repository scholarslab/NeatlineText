<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_HTML extends NeatlineNarrative_Case_Default
{


    protected $_isAdminTest = false;


    public function testNeatlinePartial()
    {

        get_view()->addScriptPath(NL_DIR . '/views/shared');

        // EXHIBIT
        // ----------------------------------------------------------------

        $exhibit = $this->_exhibit();
        $exhibit->spatial_layer = "OpenStreetMap";

        $exhibit->narrative = "
          <span data-neatline-slug='slug-1'>word1</span>
          <span data-neatline-slug='slug-2'>word2</span>
          <span data-neatline-slug='slug-3'>word3</span>
        ";

        $exhibit->save();
        get_view()->neatline_exhibit = $exhibit;

        // RECORDS
        // ----------------------------------------------------------------

        $record1 = $this->_record($exhibit);
        $record2 = $this->_record($exhibit);
        $record1->slug = 'slug-1';
        $record2->slug = 'slug-2';

        $record1->save();
        $record2->save();

        $this->_writeFixture(
            nl_getExhibitMarkup() . nl_getNarrativeMarkup(),
            'exhibit.html'
        );

    }


}
