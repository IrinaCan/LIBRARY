<?php
class ConvertDate 
{
  public $day;
  public $month;
  public $year;

  function __construct($day, $month, $year) {
    $this->day = $day;
    $this->month = $month;
    $this->year = $year;
    }

  public function convertDate() {
    return date('Y-m-d', 
    mktime(0,0,0, (int)$this->month, (int)$this->day, 
    (int)$this->year));
  }
}
?>
