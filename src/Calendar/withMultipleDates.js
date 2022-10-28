import {compose, withProps, withPropsOnChange, withState} from 'recompose';
import {withDefaultProps} from './';
import {sanitizeDate, withImmutableProps} from '../utils';
import enhanceHeader from '../Header/withMultipleDates';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

// Enhance Day component to display selected state based on an array of selected dates
export const enhanceDay = withPropsOnChange(['selected'], props => ({
  isSelected: props.selected.indexOf(props.date) !== -1,
}));

// Enhance year component
const enhanceYears = withProps(({displayDate}) => ({
  selected: displayDate ? parseISO(displayDate) : null,
}));

// Enhancer to handle selecting and displaying multiple dates
export const withMultipleDates = compose(
  withDefaultProps,
  withState('scrollDate', 'setScrollDate', getInitialDate),
  withState('displayDate', 'setDisplayDate', getInitialDate),
  withImmutableProps(({
    DayComponent,
    HeaderComponent,
    YearsComponent,
  }) => ({
    DayComponent: enhanceDay(DayComponent),
    HeaderComponent: enhanceHeader(HeaderComponent),
    YearsComponent: enhanceYears(YearsComponent),
  })),
  withProps(({displayDate, onSelect, setDisplayDate, scrollToDate, ...props}) => ({
    passThrough: {
      Day: {
        onClick: (date) => handleSelect(date, {onSelect, setDisplayDate}),
      },
      Header: {
        setDisplayDate,
      },
      Years: {
        displayDate,
        onSelect: (year, e, callback) => handleYearSelect(year, callback),
        selected: displayDate,
      },
    },
    selected: props.selected
      .filter(date => sanitizeDate(date, props))
      .map(date => format(date, 'yyyy-MM-dd')),
  })),
);

function handleSelect(date, {onSelect, setDisplayDate}) {
  onSelect(date);
  setDisplayDate(date);
}

function handleYearSelect(date, callback) {
  callback(parseISO(date));
}

function getInitialDate({selected}) {
  return selected.length ? selected[0] : new Date();
}

export function defaultMultipleDateInterpolation(date, selected) {
  const selectedMap = selected.map(date => format(date, 'yyyy-MM-dd'));
  const index = selectedMap.indexOf(format(date, 'yyyy-MM-dd'));

  return (index === -1)
    ? [...selected, date]
    : [...selected.slice(0, index), ...selected.slice(index+1)];
}
