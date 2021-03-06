import Ember from 'ember'
import layout from './template'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-checkbox'],

  didInitAttrs () {
    this.set('isChecked', this.attrs.checked)
  },

  didInsertElement () {
    if (this.get('autofocus')) {
      Ember.run.next('render', () => {
        this.$('input').focus()
      })
    }
  },

  inputId: Ember.computed('id', function () {
    const id = this.get('id') || this.elementId
    return `${ id }_input`
  }),

  actions: {
    input () {
      let id = this.get('value')
      if (_.isFunction(this.attrs['on-input'])) {
        this.attrs['on-input']({
          id: Ember.isEmpty(id) ? this.get('id') : id,
          value: this.$('input').prop('checked')
        })
      } else {
        this.sendAction('on-input', {
          id: Ember.isEmpty(id) ? this.get('id') : id,
          value: this.$('input').prop('checked')
        })
      }
    }
  }
})
