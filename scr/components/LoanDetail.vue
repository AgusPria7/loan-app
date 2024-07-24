<template>
    <div v-if="loan">
      <h1>Loan Details</h1>
      <p>Amount: {{ loan.amount }}</p>
      <p>Interest Rate: {{ loan.interestRate }}</p>
      <p>Term: {{ loan.term }}</p>
      <p>Borrower Details: {{ loan.borrowerDetails }}</p>
      <p>Repayment Schedule: {{ loan.repaymentSchedule }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        loan: null,
      };
    },
    methods: {
      fetchLoanDetails() {
        const loanId = this.$route.params.id;
        axios.get(`path/to/loans/${loanId}.json`)
          .then(response => {
            this.loan = response.data;
          })
          .catch(error => {
            console.error('Error fetching loan details:', error);
          });
      },
    },
    mounted() {
      this.fetchLoanDetails();
    },
  };
  </script>
  
  <style scoped>
    @media only screen and (max-width: 600px) {
    table {
        width: 100%;
    }
    th, td {
        font-size: 14px;
    }
    }
  </style>
  