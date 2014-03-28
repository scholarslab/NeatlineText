# NeatlineText

NeatlineText is a extension to the Neatline plugin that makes it possible to connect paragraphs, sentences, and words in text documents with annotations in Neatine exhibits. For example, imagine you're making an interactive edition of Walt Whitman's "[Salut au Monde][salut-au-monde]," and want to wire up the locations in this passage with annotations on the map:

```
I see the tracks of the rail-roads of the earth;	 
I see them welding State to State, city to city, through North America;
I see them in Great Britain, I see them in Europe;	 
I see them in Asia and in Africa.
```

### Step 1: Create the Neatline records

First, create records in the Neatline exhibit for each of the geographic entities that you want to represent on the map - North America, Great Britain, etc. - and fill in the "Slug" field in the "Text" tab with some sort of semantic, easy-to-remember string. Think of the slug as a kind of plain-text `id` for the record, an identifier that's easy to read, remember, and type else where.

[screenshot]

### Step 2: Create the HTML fragment

Then, fire up your favorite text editor, and just wrap the corresponding sections of the text in elements with `data-neatline-slug` attributes that point at the record slugs:

```html
I see the tracks of the rail-roads of the earth;	 
I see them welding State to State, city to city, through <span data-neatline-slug="north-america">North America</span>;
I see them in <span data-neatline-slug="great-britain">Great Britain</span>, I see them in <span data-neatline-slug="europe">Europe</span>;	 
I see them in <span data-neatline-slug="asia">Asia</span> and in <span data-neatline-slug="africa">Africa</span>.
```

In this case we're using `<span>` elements, since we're wrapping inline strings of words, but you could add the `data-neatline-slug` attributes to any element at all - `<p>`'s, `<div>`'s, etc.

### Step 3: Copy the HTML into the exhibit

Once the markup is ready, just paste it into the "Narrative" input in the exhibit's edit form. Be sure to put the text editor in "Source" mode, since we're copying in raw HTML markup:

[screenshot]

And that's it - now, when you open up the exhibit, NeatlineText will automatically wire up bi-directional connections between the spans in the text document and the corresponding records in Neatline. Out of the box, the plugin implements two basic interactions:

  - **Highlighting**: When the user hovers the cursor over a span in the text, any corresponding objects in the Neatline exhibit (shapes on the map, waypoints, etc.) will be highlighted. And vice versa - when the cursor hovers on an object in the exhibit, the span(s) in the text will highlight.

  - **Selecting**: When the user clicks on a span in the text, the Neatline exhibit will "focus" around the corresponding record in the exhibit - the map will pan and zoom to frame the annotation, the timeline will scroll to show the span, etc. And likewise, when the user selects a record in the Neatline exhibit, the text will automatically scroll to display the corresponding span.

## Theming

Unlike other Neatline extensions like Waypoints and SIMILE, NeatlineText needs to be used in conjunction with a theme that positions the text next to the exhibit inside of a scrollable container element. By default, most themes just display the exhibit narrative above or below the exhibit, which means that the user would need to manually scroll up and down on the page to compare the exhibit with the text, which defeats the purpose.

There are two ways to go about this:

  - **Omeka themes**: To make it easy to get up and running, we've built a really simple started theme called [Neatlight][neatlight], which is specifically designed to house NeatlineText exhibits. Think of Neatlight as the Neatline equivalent of the default "Thanks Roy" theme that ships with Omeka - it's a simple, no-frills foundation that can be easily adapted and expanded.

  - **Neatline themes**: The other approach is to use Neatline's exhibit-specific themeing system, which makes it possible to create completely separate themes for each individual Neatline exhibit. For more information about this, check out the documentation, and take a look at [David McClure's fork of the Neatlight theme][neatlight-mcclure], which contains the source code for the custom themes used in projects at [neatline.dclure.org][neatline-dclure]. 

[salut-au-monde]: http://www.bartelby.com/142/74.html
[neatlight]: https://github.com/scholarslab/neatlight
[neatlight-mcclure]: https://github.com/davidmcclure/neatlight/tree/master/neatline/exhibits/themes
[neatline-dclure]: http://neatline.dclure.org
