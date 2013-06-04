
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Subscribe `select`', function() {


  var span1, span2, fx = {
    s12: readFixtures('records.s12.json')
  };


  beforeEach(function() {

    NARRATIVE.loadNeatline();
    NL.respondMap200(fx.s12);

    span1 = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
    span2 = NARRATIVE.find('span[data-neatline-slug="slug-2"]');

  });


  it('should add `selected` class', function() {

    // --------------------------------------------------------------------
    // When `select` is triggered, the `selected` class should be added to
    // the corresponding elements in the text.
    // --------------------------------------------------------------------

    var model = NARRATIVE.getMapRecordBySlug('slug-1');
    Neatline.vent.trigger('select', { model: model });

    expect(span1).toHaveClass('selected');
    expect(span2).not.toHaveClass('selected');

  });


  it('should remove `highlighted` class', function() {

    // --------------------------------------------------------------------
    // When `select` is triggered, corresponding elements in the text
    // should be unhighlighted, which prevents the `highlight` class from
    // getting stuck on the element when the reocrd is unselected.
    // --------------------------------------------------------------------

    var model = NARRATIVE.getMapRecordBySlug('slug-1');
    Neatline.vent.trigger('highlight', { model: model });
    Neatline.vent.trigger('select', { model: model });

    expect(span1).not.toHaveClass('highlighted');

  });


});
