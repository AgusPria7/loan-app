<template>
    <div>
      <h1>Loan List</h1>
      <div>
        <label>Filter by:</label>
        <input v-model="filters.amount" placeholder="Amount" />
        <input v-model="filters.interestRate" placeholder="Interest Rate" />
        <input v-model="filters.term" placeholder="Term" />
        <button @click="applyFilters">Apply Filters</button>
      </div>
      <table>
        <thead>
          <tr>
            <th @click="sortBy('amount')">Amount</th>
            <th @click="sortBy('interestRate')">Interest Rate</th>
            <th @click="sortBy('term')">Term</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in paginatedLoans" :key="loan.id">
            <td>{{ loan.amount }}</td>
            <td>{{ loan.interestRate }}</td>
            <td>{{ loan.term }}</td>
            <td><router-link :to="{ name: 'LoanDetailPage', params: { id: loan.id } }">View Details</router-link></td>
          </tr>
        </tbody>
      </table>
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        loans: [],
        filters: {
          amount: '',
          interestRate: '',
          term: ''
        },
        sortKey: '',
        sortOrder: 1,
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      filteredLoans() {
        return this.loans.filter(loan => {
          return (!this.filters.amount || loan.amount === parseFloat(this.filters.amount)) &&
                 (!this.filters.interestRate || loan.interestRate === parseFloat(this.filters.interestRate)) &&
                 (!this.filters.term || loan.term === parseInt(this.filters.term));
        });
      },
      sortedLoans() {
        return this.filteredLoans.sort((a, b) => {
          if (this.sortKey) {
            let modifier = this.sortOrder;
            if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
            if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
            return 0;
          }
          return this.filteredLoans;
        });
      },
      paginatedLoans() {
        let start = (this.currentPage - 1) * this.itemsPerPage;
        let end = start + this.itemsPerPage;
        return this.sortedLoans.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.sortedLoans.length / this.itemsPerPage);
      }
    },
    methods: {
      fetchData() {
        axios.get('path/to/loans.json')
          .then(response => {
            this.loans = response.data;
          })
          .catch(error => {
            console.error('Error fetching loans:', error);
          });
      },
      sortBy(key) {
        this.sortKey = key;
        this.sortOrder *= -1;
      },
      applyFilters() {
        this.currentPage = 1;
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    },
    mounted() {
      this.fetchData();
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 1em;
  }
  </style>
  