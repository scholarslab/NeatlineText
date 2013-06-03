<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_JSON extends NeatlineNarrative_Case_Fixture
{


    /**
     * `Publications.slug2.json`
     * `Publications.noSlug2.json`
     */
    public function testRecords()
    {

        $record1 = $this->__record($this->exhibit);
        $record2 = $this->__record($this->exhibit);

        $record1->slug = 'slug-1';
        $record2->slug = 'slug-2';

        $record1->save();
        $record2->save();

        $this->writeFixtureFromRoute('neatline/records',
            'Publications.slug2.json'
        );

        $record2->delete();

        $this->writeFixtureFromRoute('neatline/records',
            'Publications.noSlug2.json'
        );

    }


}
