
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Publish `select`', function() {


  var span, fx = {
    s1:   readFixtures('records.s1.json'),
    s2:   readFixtures('records.s2.json'),
    s12:  readFixtures('records.s12.json')
  };


  beforeEach(function() {
    NARRATIVE.loadNeatline();
    span = NARRATIVE.find('span[data-neatline-slug="slug-2"]');
  });


  it('should publish map model when one exists', function() {

    // --------------------------------------------------------------------
    // When the a tagged element is clicked and a corresponding model
    // exists in the map collection, `select` should be published with the
    // model from the map without any interaction with the server.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.s12);
    var vent = spyOn(Neatline.vent, 'trigger');

    // Click on `slug-2`
    var c1 = NL.server.requests.length;
    span.trigger('click');
    var c2 = NL.server.requests.length;

    // Should not load new model.
    expect(c2).toEqual(c1);

    // Should publish `select`.
    expect(vent).toHaveBeenCalledWith('select', {
      model:  NARRATIVE.getMapRecordBySlug('slug-2'),
      source: Neatline.Narrative.ID
    });

  });


  it('should load model when map does not have model', function() {

    // --------------------------------------------------------------------
    // When the map collection does not contain a corresponding model, a
    // fresh model should be loaded from the server.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.s1);
    var vent = spyOn(Neatline.vent, 'trigger');

    // Click on `slug-2`
    var c1 = NL.server.requests.length;
    span.trigger('click');
    var c2 = NL.server.requests.length;

    // Should load new model.
    expect(c2).toEqual(c1+1);

    // Respond with `slug-2` model.
    NL.respondLast200(fx.s2);

    // Should publish `select`.
    expect(vent).toHaveBeenCalledWith('select', {
      model:  NARRATIVE.getNarrativeRecordBySlug('slug-2'),
      source: Neatline.Narrative.ID
    });

  });


});
