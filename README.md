# Ember Paper Data Table
Extension of [ember-data-table](https://github.com/mu-semtech/ember-data-table/) with [ember-paper](https://github.com/miguelcobain/ember-paper) styling.

## Demo
View a demo here: [https://ember-paper-data-table.semte.ch](https://ember-paper-data-table.semte.ch)

## Installation
```bash
ember install ember-paper
ember install ember-paper-data-table
```

Import the styles in `app.scss`
```scss
@import 'ember-paper';
@import 'ember-paper-data-table';
```

## Getting started
Include the `DataTableRouteMixin` in the route which model you want to show in the data table. Configure the model name.

```javascript
import Ember from 'ember';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(DataTableRouteMixin, {
  modelName: 'blogpost'
});
```

Next, include the data table in your template:

```htmlbars
{{data-table
  content=model
  fields="firstName lastName age created modified"
  isLoading=isLoadingModel
  filter=filter
  sort=sort
  page=page
  size=size
}}
```

Note: the filtering, sorting and pagination isn't done at the frontend. By including the `DataTableRouteMixin` in the route each change to the `filter`, `sort`, `page` and `size` params will result in a new request to the backend. The `DataTableRouteMixin` also sets an isLoadingModel flag while the route's model is being loaded.

Have a look at [Customizing the data table](https://github.com/mu-semtech/ember-data-table#customizing-the-data-table) to learn how you can customize the data table's header and body.

## Data table component

### Specification

The following parameters can be passed to the data-table component:

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| content | x | | a list of resources to be displayed in the table |
| fields | | | names of the model fields to show as columns (seperated by whitespace) |
| isLoading | | false | shows a spinner instead of the table content if true |
| filter | | | current value of the text search |
| sort | | | field by which the data is currently sorted |
| page | | | number of the page that is currently displayed |
| size | | | number of items shown on one page |
| enableSizes | | true | flag to enable page size options dropdown |
| sizes | | [5, 10, 25, 50, 100] | array of page size options (numbers) |
| link | | | name of the route the first column will link to. The selected row will be passed as a parameter. |
| onClickRow | | | action sent when a row is clicked. Takes the clicked item as a parameter. |
| autoSearch | | true | whether filter value is updated automatically while typing (with a debounce) or user must click a search button explicitly to set the filter value.
| noDataMessage | | No data | message to be shown when there is no content |
| lineNumbers | | false | display a line number per table row (default: false). Must be true or false. |

By default the data table will make each column sortable. The search text box is only shown if the `filter` parameter is bound. Pagination is only shown if the pagination metadata is set on the model (see the [Ember Data Table Serializer mixin](https://github.com/mu-semtech/ember-data-table#serializer)).

### Customizing the data table
The way the data is shown in the table can be customized by defining a `content` block instead of a `fields` parameter.

```htmlbars
{{#data-table content=model filter=filter sort=sort page=page size=size onClickRow=(action "clickRow") as |t|}}
  {{#t.content as |c|}}
    {{#c.header}}
      {{th-sortable field='firstName' currentSorting=sort label='First name'}}
      {{th-sortable field='lastName' currentSorting=sort label='Last name'}}
      <th>Age</th>
      {{th-sortable field='created' currentSorting=sort label='Created'}}
      <th>Modified</th>
    {{/c.header}}
    {{#c.body as |row|}}
      <td>{{row.firstName}}</td>
      <td>{{row.lastName}}</td>
      <td>{{row.age}}</td>
      <td>{{moment-format row.created}}</td>
      <td>{{moment-format row.modified}}</td>
    {{/c.body}}
  {{/t.content}}
{{/data-table}}
```
Have a look at the [helper components](https://github.com/mu-semtech/ember-data-table#helper-components).

### Adding actions to the data table
The user can add actions on top of the data table by providing a `menu` block.
```htmlbars
{{#data-table content=model filter=filter sort=sort page=page size=size isLoading=isLoadingModel as |t|}}
  {{#t.menu as |menu|}}
    {{#menu.general}}
      {{#paper-button onClick=(action "export") accent=true noInk=true}}Export{{/paper-button}}
      {{#paper-button onClick=(action "print") accent=true noInk=true}}Print{{/paper-button}}          
    {{/menu.general}}
    {{#menu.selected as |selection datatable|}}
      {{#paper-button onClick=(action "delete" selection table) accent=true noInk=true}}Delete{{/paper-button}}
    {{/menu.selected}}
  {{/t.menu}}
  {{#t.content as |c|}}
    ...
  {{/t.content}}
{{/data-table}}
```
The menu block consists of a `general` and a `selected` block. The `menu.general` is shown by default. The `menu.selected` is shown when one or more rows in the data table are selected.

When applying an action on a selection, the currently selected rows can be provided to the action by the `selection` parameter. The user must reset the selection by calling `clearSelection()` on the data table.
E.g.
```javascript
actions:
  myAction(selection, datatable) {
    console.log("Hi, you reached my action for selection: " + JSON.stringify(selection));
    datatable.clearSelection();
  }    
```

## Documentation
Have a look at the core [ember-data-table](https://github.com/mu-semtech/ember-data-table) for the full documentation.
