import localizeFilter from '@/filters/localize.filter';

export default {
  // Materialize tooltip
  bind(el, { value, modifiers }) { // вызывается однократно, при первичном связывании директивы с элементом
    M.Tooltip.init(el, {
      html: modifiers.noloc ? value : localizeFilter(value),
    });
  },
  unbind(el) { // вызывается однократно, при отвязывании директивы от элемента
    // избавляемся от утечки памяти
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};


// https://ru.vuejs.org/v2/guide/custom-directive.html
