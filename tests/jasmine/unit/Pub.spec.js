
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Event Publications', function() {


  var model1, model2, span1, span2, span3, vent;


  beforeEach(function() {

    TEXT.loadNeatline();

    model1 = TEXT.getTextRecordBySlug('slug-1');
    model2 = TEXT.getTextRecordBySlug('slug-2');

    span1 = TEXT.find('span[data-neatline-slug="slug-1"]');
    span2 = TEXT.find('span[data-neatline-slug="slug-2"]');
    span3 = TEXT.find('span[data-neatline-slug="slug-3"]');

    vent = spyOn(Neatline.vent, 'trigger').andCallThrough();

  });


  describe('highlight', function() {

    it('should publish model when one exists', function() {

      // ----------------------------------------------------------------------
      // When the cursor hovers on a tagged element, `highlight` should be
      // published with the corresponding model.
      // ----------------------------------------------------------------------

      span1.trigger('mouseenter');

      expect(vent).toHaveBeenCalledWith('highlight', {
        model:  model1,
        source: Neatline.Text.ID
      });

    });

    it('should not publish when model does not exist', function() {

      // ----------------------------------------------------------------------
      // When no model exists, `highlight` should not be published.
      // ----------------------------------------------------------------------

      span3.trigger('mouseenter');

      expect(vent).not.toHaveBeenCalledWith();

    });

  });


  describe('unhighlight', function() {

    it('should publish model when one exists', function() {

      // ----------------------------------------------------------------------
      // When the cursor leaves a tagged element, `unhighlight` should be
      // published with the corresponding model.
      // ----------------------------------------------------------------------

      span1.trigger('mouseleave');

      expect(vent).toHaveBeenCalledWith('unhighlight', {
        model:  model1,
        source: Neatline.Text.ID
      });

    });

    it('should not publish when model does not exist', function() {

      // ----------------------------------------------------------------------
      // When no model exists, `unhighlight` should not be published.
      // ----------------------------------------------------------------------

      span3.trigger('mouseenter');

      expect(vent).not.toHaveBeenCalledWith();

    });

  });


  describe('select', function() {

    it('should publish model when one exists', function() {

      // ----------------------------------------------------------------------
      // When the cursor clicks on a tagged element, `select` should be
      // published with the corresponding model.
      // ----------------------------------------------------------------------

      span1.trigger('click');

      expect(vent).toHaveBeenCalledWith('select', {
        model:  model1,
        source: Neatline.Text.ID
      });

    });

    it('should not trigger unselect', function() {

      // ----------------------------------------------------------------------
      // When a tagged element is clicked, event propagation should be halted
      // at the level of the span. Otherwise, the event would bubble up to the
      // container and trigger the click-off unselect.
      // ----------------------------------------------------------------------

      span1.trigger('click');

      expect(vent).not.toHaveBeenCalledWith('unselect', {
        model:  model1,
        source: Neatline.Text.ID
      });

    });

    it('should not publish when model does not exist', function() {

      // ----------------------------------------------------------------------
      // When no model exists, `select` should not be published.
      // ----------------------------------------------------------------------

      span3.trigger('click');

      expect(vent).not.toHaveBeenCalledWith();

    });

    it('should unselect currently-selected model', function() {

      // ----------------------------------------------------------------------
      // If another model is currently selected, it should be unselected.
      // ----------------------------------------------------------------------

      span1.trigger('click');
      span2.trigger('click');

      expect(vent).toHaveBeenCalledWith('unselect', {
        model:  model1,
        source: Neatline.Text.ID
      });

    });

  });


  describe('unselect', function() {

    it('should unselect on click-off', function() {

      // ----------------------------------------------------------------------
      // When a span is unselected by a click inside the container but not on
      // a tagged element, the selected model should be unselected.
      // ----------------------------------------------------------------------

      span1.trigger('click');
      Neatline.Text.__view.$el.trigger('click');

      expect(vent).toHaveBeenCalledWith('unselect', {
        model:  model1,
        source: Neatline.Text.ID
      });

    });

  });


});
