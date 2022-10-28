import {
  compose,
  withProps,
  withPropsOnChange,
  withState,
} from 'recompose';
import {withDefaultProps} from './';
import {sanitizeDate, withImmutableProps} from '../utils';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const enhanceDay = withPropsOnChange(['selected'], props => ({
  isSelected: props.selected === props.date,
}));

const enhanceYear = withPropsOnChange(['selected'], ({selected}) => ({
  selected: parseISO(selected),
}));

// Enhancer to handle selecting and displaying a single date
export const withDateSelection = compose(
  withDefaultProps,
  withImmutableProps(({
    DayComponent,
    onSelect,
    setScrollDate,
    YearsComponent,
  }) => ({
    DayComponent: enhanceDay(DayComponent),
    YearsComponent: enhanceYear(YearsComponent),
  })),
  withState('scrollDate', 'setScrollDate', props => props.selected || new Date()),
  withProps(({onSelect, setScrollDate, ...props}) => {
    const selected = sanitizeDate(props.selected, props);

    return {
      passThrough: {
        Day: {
          onClick: onSelect,
        },
        Years: {
          onSelect: (year) => handleYearSelect(year, {onSelect, selected, setScrollDate}),
        },
      },
      selected: selected && format(selected, 'yyyy-MM-dd'),
    };
  }),
);

function handleYearSelect(date, {setScrollDate, selected, onSelect}) {
  const newDate = parseISO(date);

  onSelect(newDate);
  setScrollDate(newDate);
}
