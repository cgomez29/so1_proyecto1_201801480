#include <linux/module.h>
#include <linux/proc_fs.h>
#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/mm.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Cristian Gomez");
MODULE_DESCRIPTION("Informacion de la RAM");
MODULE_VERSION("0.1");

struct sysinfo inf;

static int escribir_a_proc(struct seq_file *file_proc, void *v) {       
    unsigned long total, used, percentage;

    si_meminfo(&inf);

    total = (inf.totalram * inf.mem_unit)/1000000;
    used = (inf.totalram - inf.freeram - inf.bufferram ) * inf.mem_unit/1000000;
    percentage = (used * 100)/total;  
    
    seq_printf(file_proc,"{\"total\":\"%lu\", \"used\":\"%lu\", \"percentage\":\"%lu\"}", total, used, percentage);
    
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
    proc_create("memo_201801480", 0, NULL, &archivo_operaciones);
    printk(KERN_INFO "201801480\n");

    return 0;
}
 
static void __exit modulo_c3_cleanup(void){
    remove_proc_entry("memo_201801480", NULL);    
    printk(KERN_INFO "SISTEMAS OPERATIVOS 1\n");
}

module_init(modulo_c3_init);
module_exit(modulo_c3_cleanup); 