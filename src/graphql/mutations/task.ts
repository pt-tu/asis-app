import { gql } from '@apollo/client';

export const MARK_TASK_COMPLETE = gql`
  mutation MarkTaskComplete($id: ID!) {
    markTaskComplete(id: $id) {
      id
      isCompleted
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: TaskUpdateInput!) {
    updateTask(id: $id, input: $input) {
      id
      task_name
      start_time
      end_time
      duration_minutes
      tag
      isLocked
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: TaskCreateInput!) {
    createTask(input: $input) {
      id
      task_name
      start_time
      end_time
      duration_minutes
      tag
    }
  }
`;
