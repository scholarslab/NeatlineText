
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Event Subscriptions', function() {


  var span1, span2, model1, model2, fx = {
    records: readFixtures('records.json')
  };


  beforeEach(function() {

    NARRATIVE.loadNeatline();
    NL.respondMap200(fx.records);

    span1 = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
    span2 = NARRATIVE.find('span[data-neatline-slug="slug-2"]');

    model1 = NARRATIVE.getMapRecordBySlug('slug-1');
    model2 = NARRATIVE.getMapRecordBySlug('slug-2');

  });


  describe('highlight', function() {

    it('should add `highlighted` class', function() {

      // ------------------------------------------------------------------
      // When `highlight` is triggered, the `highlighted` class should be
      // added to the corresponding element in the text.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });

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

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unhighlight', { model: model1 });

      expect(span1).not.toHaveClass('highlighted');

    });

  });


  describe('select', function() {

    it('should add `selected` class', function() {

      // ------------------------------------------------------------------
      // When `select` is triggered, the `selected` class should be added
      // to the corresponding elements in the text.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });

      expect(span1).toHaveClass('selected');
      expect(span2).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ------------------------------------------------------------------
      // The `highlighted` class should be removed, in case it was added
      // before the record was selected.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('select', { model: model1 });

      expect(span1).not.toHaveClass('highlighted');

    });

    it('should unselect currently-selected model', function() {

      // ------------------------------------------------------------------
      // Only one record should be selected at any given point; if another
      // record is selected, it should be unselecte.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });
      Neatline.vent.trigger('select', { model: model2 });

      expect(span1).not.toHaveClass('selected');
      expect(span2).toHaveClass('selected');

    });

  });


  describe('unselect', function() {

    it('should remove `selected` class', function() {

      // ------------------------------------------------------------------
      // When `unselect` is triggered, the `selected` class should be
      // removed from the corresponding element in the text.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(span1).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ------------------------------------------------------------------
      // The `highlighted` class should also be removed, in case it was
      // added before the record was selected.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(span1).not.toHaveClass('highlighted');

    });

  });


});
