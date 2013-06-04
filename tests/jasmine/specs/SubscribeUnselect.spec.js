
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Subscribe `unselect`', function() {


  var span1, span2, fx = {
    s12: readFixtures('records.s12.json')
  };


  beforeEach(function() {

    NARRATIVE.loadNeatline();
    NL.respondMap200(fx.s12);

    span1 = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
    span2 = NARRATIVE.find('span[data-neatline-slug="slug-2"]');

  });


  it('should remove `selected` class', function() {

    // --------------------------------------------------------------------
    // When `unselect` is triggered, the `selected` class should be
    // removed from the corresponding element in the text.
    // --------------------------------------------------------------------

    var model = NARRATIVE.getMapRecordBySlug('slug-1');
    Neatline.vent.trigger('select', { model: model });
    Neatline.vent.trigger('unselect', { model: model });

    expect(span1).not.toHaveClass('selected');

  });


});
