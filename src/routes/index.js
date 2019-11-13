import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Student from '~/pages/Student';
import StudentCreate from '~/pages/Student/Create';
import StudentUpdate from '~/pages/Student/Update';

import Plan from '~/pages/Plan';
import PlanCreate from '~/pages/Plan/Create';
import PlanUpdate from '~/pages/Plan/Update';

import Enrollment from '~/pages/Enrollment';
import EnrollmentCreate from '~/pages/Enrollment/Create';
import EnrollmentUpdate from '~/pages/Enrollment/Update';

import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Student} isPrivate />
      <Route
        path="/students/create"
        exact
        component={StudentCreate}
        isPrivate
      />
      <Route
        path="/students/update/:studentId(\d+)"
        exact
        component={StudentUpdate}
        isPrivate
      />

      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plans/create" exact component={PlanCreate} isPrivate />
      <Route
        path="/plans/update/:planId(\d+)"
        exact
        component={PlanUpdate}
        isPrivate
      />

      <Route path="/enrollments" exact component={Enrollment} isPrivate />
      <Route
        path="/enrollments/create"
        exact
        component={EnrollmentCreate}
        isPrivate
      />
      <Route
        path="/enrollments/update/:enrollmentId(\d+)"
        exact
        component={EnrollmentUpdate}
        isPrivate
      />

      <Route path="/helporders" exact component={HelpOrder} isPrivate />
    </Switch>
  );
}
