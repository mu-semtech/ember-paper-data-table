import { scheduleOnce } from '@ember/runloop';
import { oneWay } from '@ember/object/computed';
import TextSearchComponent from 'ember-data-table/components/text-search';
import layout from '../templates/components/paper-text-search';

export default TextSearchComponent.extend({
  layout,
  isExpanded: oneWay('filter', function() {
    return this.get('filter').length > 0;
  }),
  _openSearch() {
    this.set('isExpanded', true);
    scheduleOnce('afterRender', this, function() {
      this.$('input').focus();
    });
  },
  _closeSearch() {
    this.set('isExpanded', false);
    this.set('filter', '');
    this.set('value', '');
    scheduleOnce('afterRender', this, function() {
      this.$('input').focusout();
    });
  },
  click() {
    if (this.get('isExpanded')) { this._closeSearch(); } else { this._openSearch(); }
  },
  keyUp(e) {
    if (this.get('isExpanded') && e.keyCode === 27) { // escape
      this._closeSearch();
    }
    else if (!this.get('auto') && this.get('isExpanded') && e.keyCode === 13) { // enter
      this.set('filter', this.get('value')); // trigger non-automatic search
    }
  },
  actions: {
    toggleExpansion() {
      if (this.get('isExpanded')) { this._closeSearch(); } else { this._openSearch(); }
    }
  }
});
