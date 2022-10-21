import React from "react";
import addDays from "date-fns/addDays";
import subMonths from "date-fns/subMonths";

import InfiniteCalendar from "../";

const today = new Date();

export default {
  title: "Basic Settings",
  component: InfiniteCalendar,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <InfiniteCalendar {...args} />;

export const DefaultConfiguration = Template.bind({});

export const InitiallySelectedDate = Template.bind({});
InitiallySelectedDate.args = {
  selected: addDays(today, 5),
};

export const BlankInitialState = Template.bind({});
BlankInitialState.args = {
  selected: null,
};

export const MinDate = Template.bind({});
MinDate.args = {
  min: subMonths(today, 1),
  minDate: addDays(today, 1),
  selected: addDays(today, 5),
};

export const DisableSpecificDates = Template.bind({});
DisableSpecificDates.args = {
  disabledDates: [-10, -5, -6, 5, 6, 7, 2].map((amount) =>
    addDays(today, amount)
  ),
};

export const DisableSpecificWeekdays = Template.bind({});
DisableSpecificWeekdays.args = {
  disabledDays: [0, 6],
};
