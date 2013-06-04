
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Event Publications', function() {


  var span, fx = {
    s1:   readFixtures('records.s1.json'),
    s2:   readFixtures('records.s2.json'),
    s12:  readFixtures('records.s12.json')
  };


  beforeEach(function() {
    NARRATIVE.loadNeatline();
    span = NARRATIVE.find('span[data-neatline-slug="slug-1"]');
  });


  describe('highlight', function() {

    it('should publish map model when one exists', function() {

      // ------------------------------------------------------------------
      // When the cursor hovers on a tagged element and the corresponding
      // model is already loaded in the map collection, `highlight` should
      // be published with the model from the map.
      // ------------------------------------------------------------------

      NL.respondMap200(fx.s12);
      var vent = spyOn(Neatline.vent, 'trigger');

      // Hover on `slug-1`
      span.trigger('mouseenter');

      // Should publish `highlight`.
      expect(vent).toHaveBeenCalledWith('highlight', {
        model:  NARRATIVE.getMapRecordBySlug('slug-1'),
        source: Neatline.Narrative.ID
      });

    });

    it('should not publish when map does not have model', function() {

      // ------------------------------------------------------------------
      // When the map collection does not contain a corresponding model,
      // `highlight` should _not_ be published.
      // ------------------------------------------------------------------

      NL.respondMap200(fx.s2);
      var vent = spyOn(Neatline.vent, 'trigger');

      // Hover on `slug-1`.
      span.trigger('mouseenter');

      // Should not publish.
      expect(vent).not.toHaveBeenCalled();

    });

  });


  describe('unhighlight', function() {

    it('should publish map model when one exists', function() {

      // ------------------------------------------------------------------
      // When the cursor leaves a tagged element and the corresponding
      // model is present in the map collection, `unhighlight` should be
      // published with with the model from the map.
      // ------------------------------------------------------------------

      NL.respondMap200(fx.s12);
      var vent = spyOn(Neatline.vent, 'trigger');

      // Unhover on `slug-1`
      span.trigger('mouseleave');

      // Should publish `unhighlight`.
      expect(vent).toHaveBeenCalledWith('unhighlight', {
        model:  NARRATIVE.getMapRecordBySlug('slug-1'),
        source: Neatline.Narrative.ID
      });

    });

    it('should not publish when map does not have model', function() {

      // ------------------------------------------------------------------
      // When the map collection does not contain a corresponding model,
      // `unhighlight` should _not_ be published.
      // ------------------------------------------------------------------

      NL.respondMap200(fx.s2);
      var vent = spyOn(Neatline.vent, 'trigger');

      // Unhover on `slug-1`.
      span.trigger('mouseleave');

      // Should not publish.
      expect(vent).not.toHaveBeenCalled();

    });

  });


  describe('select', function() {

    it('should publish map model when one exists', function() {

      // ------------------------------------------------------------------
      // When the a tagged element is clicked and the corresponding model
      // is present in the map collection, `select` should be published
      // with the model from the map.
      // ------------------------------------------------------------------

      NL.respondMap200(fx.s12);
      var vent = spyOn(Neatline.vent, 'trigger');

      // Click on `slug-1`
      var c1 = NL.server.requests.length;
      span.trigger('click');
      var c2 = NL.server.requests.length;

      // Should not load new model.
      expect(c2).toEqual(c1);

      // Should publish `select`.
      expect(vent).toHaveBeenCalledWith('select', {
        model:  NARRATIVE.getMapRecordBySlug('slug-1'),
        source: Neatline.Narrative.ID
      });

    });

    it('should load model when map does not have model', function() {

      // ------------------------------------------------------------------
      // When the map collection does not contain a corresponding model, a
      // fresh model should be loaded from the server.
      // ------------------------------------------------------------------

      NL.respondMap200(fx.s2);
      var vent = spyOn(Neatline.vent, 'trigger');

      // Click on `slug-1`
      var c1 = NL.server.requests.length;
      span.trigger('click');
      var c2 = NL.server.requests.length;

      // Should load new model.
      expect(c2).toEqual(c1+1);

      // Respond with `slug-1` model.
      NL.respondLast200(fx.s1);

      // Should publish `select`.
      expect(vent).toHaveBeenCalledWith('select', {
        model:  NARRATIVE.getNarrativeRecordBySlug('slug-1'),
        source: Neatline.Narrative.ID
      });

    });

  });


});
