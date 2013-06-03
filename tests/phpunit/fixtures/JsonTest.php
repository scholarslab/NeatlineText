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
     * `Publish.records.slug2.json`
     * `Publish.records.noSlug2.json`
     * `Publish.record.slug2.json`
     */
    public function testRecords()
    {

        $record1 = $this->__record($this->exhibit);
        $record2 = $this->__record($this->exhibit);

        $record1->slug = 'slug-1';
        $record1->save();

        $this->writeFixtureFromRoute('neatline/records',
            'records.s1.json'
        );

        $record2->slug = 'slug-2';
        $record2->save();

        $this->writeFixtureFromRoute('neatline/records',
            'records.s12.json'
        );

        $record1->delete();

        $this->writeFixtureFromRoute('neatline/records',
            'records.s2.json'
        );

    }


}
