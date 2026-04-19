import { gql } from '@apollo/client';

export const GENERATE_PLAN_MUTATION = gql`
  mutation GeneratePlan(
    $prompt: String!
    $category: String
    $smartAdjust: Boolean
  ) {
    generatePlan(
      prompt: $prompt
      category: $category
      smartAdjust: $smartAdjust
    ) {
      status
      options
      tasks {
        task_name
        start_time
        end_time
        duration_minutes
        tag
        isNew
        isModified
      }
    }
  }
`;

export const APPROVE_TASKS_MUTATION = gql`
  mutation ApproveTasks($tasks: [TaskInput!]!) {
    approveTasks(tasks: $tasks) {
      success
    }
  }
`;
