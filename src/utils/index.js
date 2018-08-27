class Utils {
  formatDate(date) {
    if (date) {
      return new Date(date).toLocaleDateString();
    }
    return 'N/A';
  }

  isOdd(num) {
    return num % 2 === 1;
  }
}

export default new Utils();
