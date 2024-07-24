  <template>
    <div>
      <h1>Detail Pinjaman</h1>
      <div v-if="loan">
        <h2>Pinjaman ID: {{ loan.id }}</h2>
        <p>Jumlah: {{ loan.amount }}</p>
        <p>Suku Bunga: {{ loan.interestRate }}%</p>
        <p>Jangka Waktu: {{ loan.term }} bulan</p>
        <p>Tujuan: {{ loan.purpose }}</p>
        <p>Rating Risiko: {{ loan.riskRating }}</p>
        <h3>Rincian Peminjam</h3>
        <p>Nama: {{ loan.borrower.name }}</p>
        <p>Alamat: {{ loan.borrower.address }}</p>
        <h3>Jadwal Pembayaran</h3>
        <ul>
          <li v-for="payment in loan.paymentSchedule" :key="payment.date">
            Tanggal: {{ payment.date }} - Jumlah: {{ payment.amount }}
          </li>
        </ul>
      </div>
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
  h1 {
    font-size: 2em;
    margin-bottom: 1em;
  }
  h2 {
    font-size: 1.5em;
  }
  p {
    margin: 0.5em 0;
  }
  h3 {
    font-size: 1.2em;
    margin-top: 1em;
  }
  </style>
  