import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: #0a0a0a;
    color: #e6e6e6;
  }

  :root {
    --obsidian: #0a0a0a;
    --moonstone: #00f3ff;
    --shadow: #1a1a1a;
    --mist: #6c5ce7;
    --silver: #e6e6e6;
    --smoke: #4a4a4a;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const CTAButton = styled.a`
  background: linear-gradient(45deg, var(--mist), var(--moonstone));
  color: var(--obsidian);
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  display: inline-block;
  margin-top: 1.5rem;
  border: 1px solid var(--moonstone);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px var(--moonstone);
  }
`;

export const Card = styled.div`
  background: var(--shadow);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--smoke);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--moonstone);
  }
`;