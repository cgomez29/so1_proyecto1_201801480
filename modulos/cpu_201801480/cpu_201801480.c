#include <linux/module.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
#include <linux/uaccess.h>
#include <linux/fs.h>
#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/slab.h>
#include <linux/mm.h>
#include <linux/swap.h>
#include <linux/timekeeping.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Cristian Gomez");
MODULE_VERSION("0.1");

static int escribir_a_proc(struct seq_file *file_proc, void *v) {       

    unsigned long current_time = ktime_get_real_seconds(); // Segundos transcurridos desde 1970
    int seconds, minutes, hours;

    seconds = (current_time % 60);      // Obtener segundos en la hora actual
    minutes = (current_time / 60) % 60; // Obtener minutos en la hora actual
    hours = (current_time / 3600) % 24; // Obtener horas en tiempo actual

    seq_printf(file_proc,"{\"timestamp\":\"%d:%d:%d\"}", hours, minutes, seconds);
    
    return 0;
}

static int abrir_aproc(struct inode *inode, struct  file *file) {
  return single_open(file, escribir_a_proc, NULL);
}

static struct proc_ops archivo_operaciones = {    
    .proc_open = abrir_aproc,
    .proc_read = seq_read
};

static int __init modulo_c3_init(void) {
    proc_create("cpu_201801480", 0, NULL, &archivo_operaciones);
    printk(KERN_INFO "201801480\n");

    return 0;
}
 
static void __exit modulo_c3_cleanup(void){
    remove_proc_entry("cpu_201801480", NULL);    
    printk(KERN_INFO "Diciembre 2021\n");
}

module_init(modulo_c3_init);
module_exit(modulo_c3_cleanup); 