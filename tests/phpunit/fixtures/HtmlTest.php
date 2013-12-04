<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_HTML extends NeatlineText_Case_Fixture
{


    public function testNeatlinePartial()
    {

        // EXHIBIT
        // --------------------------------------------------------------------

        $this->exhibit->widgets = "Text";
        $this->exhibit->spatial_layer = "OpenStreetMap";
        $this->exhibit->narrative = <<<HTML
          <span data-neatline-slug='slug-1'>word1</span>
          <span data-neatline-slug='slug-2'>word2</span>
          <span data-neatline-slug='slug-3'>word3</span>
HTML;

        $this->exhibit->save();
        get_view()->neatline_exhibit = $this->exhibit;

        // RECORDS
        // --------------------------------------------------------------------

        $record1 = $this->_record($this->exhibit);
        $record2 = $this->_record($this->exhibit);
        $record1->slug = 'slug-1';
        $record2->slug = 'slug-2';

        $record1->save();
        $record2->save();

        // Write the fixture.
        $template = nl_getExhibitMarkup() . nl_getNarrativeMarkup();
        $this->_writeFixture($template, 'exhibit.html');

    }


}
