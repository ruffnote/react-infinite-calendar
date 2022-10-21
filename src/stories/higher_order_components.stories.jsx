import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import addDays from "date-fns/addDays";
import subMonths from "date-fns/subMonths";

import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withDateSelection,
  withKeyboardSupport,
  withMultipleDates,
  withRange,
} from "../";

export default {
  title: "Higher Order Components",
  component: InfiniteCalendar,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <InfiniteCalendar {...args} />;

export const RangeSelection = Template.bind({});
RangeSelection.args = {
  selected: {
    start: addDays(new Date(), 2),
    end: addDays(new Date(), 17),
  },
  locale: {
    headerFormat: "MMM do",
  },
  Component: withRange(withKeyboardSupport(Calendar)),
};
