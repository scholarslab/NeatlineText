
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Event Subscriptions', function() {


  var span1, span2, model1, model2, fx = {
    records: readFixtures('records.json')
  };


  beforeEach(function() {

    TEXT.loadNeatline();
    NL.respondMap200(fx.records);

    span1 = TEXT.find('span[data-neatline-slug="slug-1"]');
    span2 = TEXT.find('span[data-neatline-slug="slug-2"]');

    model1 = TEXT.getMapRecordBySlug('slug-1');
    model2 = TEXT.getMapRecordBySlug('slug-2');

  });


  describe('highlight', function() {

    it('should add `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // When `highlight` is triggered, the `highlighted` class should be
      // added to the corresponding element in the text.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });

      expect(span1).toHaveClass('highlighted');
      expect(span2).not.toHaveClass('highlighted');

    });

  });


  describe('unhighlight', function() {

    it('should remove `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // When `unhighlight` is triggered, the `highlighted` class should be
      // removed to the corresponding element in the text.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unhighlight', { model: model1 });

      expect(span1).not.toHaveClass('highlighted');

    });

  });


  describe('select', function() {

    it('should add `selected` class', function() {

      // ----------------------------------------------------------------------
      // When `select` is triggered, the `selected` class should be added to
      // the corresponding elements in the text.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });

      expect(span1).toHaveClass('selected');
      expect(span2).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // The `highlighted` class should be removed, in case it was added
      // before the record was selected.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('select', { model: model1 });

      expect(span1).not.toHaveClass('highlighted');

    });

    it('should handle missing spans', function() {

      // ----------------------------------------------------------------------
      // An error should not be thrown if a model is passed that does not have
      // a corresponding span in the text.
      // ----------------------------------------------------------------------

      // Create a model that does not have a span.
      var absent = new Neatline.Shared.Record.Model({ id: 999 });

      expect(function() {
        Neatline.vent.trigger('select', { model: absent });
      }).not.toThrow();

    });

    it('should unselect currently-selected model', function() {

      // ----------------------------------------------------------------------
      // If another model is currently selected, it should be unselected.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });
      Neatline.vent.trigger('select', { model: model2 });

      expect(span1).not.toHaveClass('selected');
      expect(span2).toHaveClass('selected');

    });

  });


  describe('unselect', function() {

    it('should remove `selected` class', function() {

      // ----------------------------------------------------------------------
      // When `unselect` is triggered, the `selected` class should be removed
      // from the corresponding element in the text.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(span1).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // The `highlighted` class should also be removed, in case it was added
      // before the record was selected.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(span1).not.toHaveClass('highlighted');

    });

  });


});
