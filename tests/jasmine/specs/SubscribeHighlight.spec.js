
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Subscribe `highlight`', function() {


  var span1, span2, fx = {
    s12: readFixtures('records.s12.json')
  };


  beforeEach(function() {

    NARRATIVE.loadNeatline();
    NL.respondMap200(fx.s12);

    span1 = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
    span2 = NARRATIVE.find('span[data-neatline-slug="slug-2"]');

  });


  it('should add `highlighted` class to corresponding span', function() {

    // --------------------------------------------------------------------
    // When `highlight` is triggered, the `highlighted` class should be
    // added to the corresponding element in the text.
    // --------------------------------------------------------------------

    Neatline.vent.trigger('highlight', {
      model: NARRATIVE.getMapRecordBySlug('slug-1')
    });

    expect(span1).toHaveClass('highlighted');
    expect(span2).not.toHaveClass('highlighted');

  });


});
