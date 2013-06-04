
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Event Subscriptions', function() {


  var span1, span2, model, fx = {
    s12: readFixtures('records.s12.json')
  };


  beforeEach(function() {

    NARRATIVE.loadNeatline();
    NL.respondMap200(fx.s12);

    span1 = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
    span2 = NARRATIVE.find('span[data-neatline-slug="slug-2"]');

    model = NARRATIVE.getMapRecordBySlug('slug-1');

  });


  describe('highlight', function() {

    it('should add `highlighted` class', function() {

      // ------------------------------------------------------------------
      // When `highlight` is triggered, the `highlighted` class should be
      // added to the corresponding element in the text.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model });

      expect(span1).toHaveClass('highlighted');
      expect(span2).not.toHaveClass('highlighted');

    });

  });


  describe('unhighlight', function() {

    it('should remove `highlighted` class', function() {

      // ------------------------------------------------------------------
      // When `unhighlight` is triggered, the `highlighted` class should
      // be removed to the corresponding element in the text.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model });
      Neatline.vent.trigger('unhighlight', { model: model });

      expect(span1).not.toHaveClass('highlighted');

    });

  });


  describe('select', function() {

    it('should add `selected` class', function() {

      // ------------------------------------------------------------------
      // When `select` is triggered, the `selected` class should be added
      // to the corresponding elements in the text.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model });

      expect(span1).toHaveClass('selected');
      expect(span2).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ------------------------------------------------------------------
      // When `select` is triggered, corresponding elements in the text
      // should be unhighlighted, which prevents the `highlighted` class
      // from getting stuck when the reocrd is unselected.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model });
      Neatline.vent.trigger('select', { model: model });

      expect(span1).not.toHaveClass('highlighted');

    });

  });


  describe('unselect', function() {

    it('should remove `selected` class', function() {

      // ------------------------------------------------------------------
      // When `unselect` is triggered, the `selected` class should be
      // removed from the corresponding element in the text.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model });
      Neatline.vent.trigger('unselect', { model: model });

      expect(span1).not.toHaveClass('selected');

    });

  });


});
