
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Publish `unhighlight`', function() {


  var span, fx = {
    s1:   readFixtures('records.s1.json'),
    s12:  readFixtures('records.s12.json')
  };


  beforeEach(function() {
    NARRATIVE.loadNeatline();
    span = NARRATIVE.find('span[data-neatline-slug="slug-2"]');
  });


  it('should publish map model when one exists', function() {

    // --------------------------------------------------------------------
    // When the cursor leaves a tagged element and a corresponding model
    // exists in the map collection, `unhighlight` should be published
    // with with the model from the map.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.s12);
    var vent = spyOn(Neatline.vent, 'trigger');

    // Unhover on `slug-2`
    span.trigger('mouseleave');

    // Should publish `unhighlight`.
    expect(vent).toHaveBeenCalledWith('unhighlight', {
      model:  NARRATIVE.getMapRecordBySlug('slug-2'),
      source: Neatline.Narrative.ID
    });

  });


  it('should not publish when map does not have model', function() {

    // --------------------------------------------------------------------
    // When the map collection does not contain a corresponding model,
    // `highlight` should _not_ be published.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.s1);
    var vent = spyOn(Neatline.vent, 'trigger');

    // Unhover on `slug-2`.
    span.trigger('mouseleave');

    // Should not publish.
    expect(vent).not.toHaveBeenCalled();

  });


});
