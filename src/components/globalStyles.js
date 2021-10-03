import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .main-layout{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  .crypto-card  .ant-card-head{
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
  }
  .crypto-card .ant-card-body{
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
  }
  .themeControl{
    background-color: ${({ theme }) => theme.themeControl};
    border: none;
    color: ${({ theme }) => theme.themeControlText};
    padding: 5px;
  }
  `;
