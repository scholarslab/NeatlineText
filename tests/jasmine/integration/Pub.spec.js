
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Event Publications', function() {


  var model, span1, span3, vent;


  beforeEach(function() {

    NARRATIVE.loadNeatline();

    model = NARRATIVE.getNarrativeRecordBySlug('slug-1');
    span1 = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
    span3 = NARRATIVE.find('span[data-neatline-slug="slug-3"]');
    vent = spyOn(Neatline.vent, 'trigger');

  });


  describe('highlight', function() {

    it('should publish model when one exists', function() {

      // ------------------------------------------------------------------
      // When the cursor hovers on a tagged element, `highlight` should be
      // published with the corresponding model.
      // ------------------------------------------------------------------

      span1.trigger('mouseenter');

      expect(vent).toHaveBeenCalledWith('highlight', {
        model:  model,
        source: Neatline.Narrative.ID
      });

    });

    it('should not publish when model does not exist', function() {

      // ------------------------------------------------------------------
      // When no model exists, `highlight` should not be published.
      // ------------------------------------------------------------------

      span3.trigger('mouseenter');

      expect(vent).not.toHaveBeenCalledWith();

    });

  });


  describe('unhighlight', function() {

    it('should publish model when one exists', function() {

      // ------------------------------------------------------------------
      // When the cursor leaves a tagged element, `unhighlight` should be
      // published with the corresponding model.
      // ------------------------------------------------------------------

      span1.trigger('mouseleave');

      expect(vent).toHaveBeenCalledWith('unhighlight', {
        model:  model,
        source: Neatline.Narrative.ID
      });

    });

    it('should not publish when model does not exist', function() {

      // ------------------------------------------------------------------
      // When no model exists, `unhighlight` should not be published.
      // ------------------------------------------------------------------

      span3.trigger('mouseenter');

      expect(vent).not.toHaveBeenCalledWith();

    });

  });


  describe('select', function() {

    it('should publish model when one exists', function() {

      // ------------------------------------------------------------------
      // When the cursor clicks on a tagged element, `select` should be
      // published with the corresponding model.
      // ------------------------------------------------------------------

      span1.trigger('click');

      expect(vent).toHaveBeenCalledWith('select', {
        model:  model,
        source: Neatline.Narrative.ID
      });

    });

    it('should not publish when model does not exist', function() {

      // ------------------------------------------------------------------
      // When no model exists, `select` should not be published.
      // ------------------------------------------------------------------

      span3.trigger('click');

      expect(vent).not.toHaveBeenCalledWith();

    });

  });


});
