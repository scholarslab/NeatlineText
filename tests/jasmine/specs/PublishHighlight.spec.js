
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Narrative
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Publish `highlight`', function() {


  var span, fx = {
    slug2: readFixtures('Publications.slug2.json'),
    noSlug2: readFixtures('Publications.noSlug2.json')
  };


  beforeEach(function() {
    NARRATIVE.loadNeatline();
    span = NARRATIVE.find('span[data-neatline-slug="slug-2"]');
  });


  it('should publish when span has map layer', function() {

    // --------------------------------------------------------------------
    // When the cursor hovers over an element with a `data-neatline-slug`
    // attribute and a model exists in the map collection with a slug that
    // matches the attribute value, the `highlight` event should be
    // published with the record model.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.slug2);
    var vent = spyOn(Neatline.vent, 'trigger');
    span.trigger('mouseenter');

    expect(vent).toHaveBeenCalledWith('highlight', {
      model:  NARRATIVE.getMapRecordBySlug('slug-2'),
      source: Neatline.Narrative.ID
    });

  });


  it('should not publish when span does not have map layer', function() {

    // --------------------------------------------------------------------
    // When the map collection does not contain a model with a slug that
    // matches the value of the attribute, `highlight` should be _not_ be
    // published, since we don't have a model to work with.
    // --------------------------------------------------------------------

    NL.respondMap200(fx.noSlug2);
    var vent = spyOn(Neatline.vent, 'trigger');
    span.trigger('mouseenter');

    expect(vent).not.toHaveBeenCalled();

  });


});
