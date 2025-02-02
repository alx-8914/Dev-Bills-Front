import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > div {
      display: grid;
      grid-template-columns: 80% auto;
      grid-gap: 0.5rem;
    }
  }

  footer button {
    padding: 1rem 2rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;