
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Subscribe `unhighlight`', function() {


  var span1, span2, fx = {
    s12: readFixtures('records.s12.json')
  };


  beforeEach(function() {

    NARRATIVE.loadNeatline();
    NL.respondMap200(fx.s12);

    span1 = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
    span2 = NARRATIVE.find('span[data-neatline-slug="slug-2"]');

  });


  it('should remove `highlighted` class', function() {

    // --------------------------------------------------------------------
    // When `unhighlight` is triggered, the `highlighted` class should be
    // removed to the corresponding element in the text.
    // --------------------------------------------------------------------

    var model = NARRATIVE.getMapRecordBySlug('slug-1');
    Neatline.vent.trigger('highlight', { model: model });
    Neatline.vent.trigger('unhighlight', { model: model });

    expect(span1).not.toHaveClass('highlighted');

  });


});
