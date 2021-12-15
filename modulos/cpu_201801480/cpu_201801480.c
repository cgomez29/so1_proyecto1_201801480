#include <linux/module.h> // THIS_MODULE, MODULE_VERSION, ...
#include <linux/init.h>  // module_{init,exit}
#include <linux/proc_fs.h>
#include <linux/sched/signal.h> // for_each_process()
#include <linux/seq_file.h>
#include <linux/fs.h>
#include <linux/sched.h>
#include <linux/mm.h> // get_mm_rss()

struct task_struct *task;           // sched.h para tareas/procesos 
struct task_struct *task_child;     // index de tareas secundarias
struct list_head *list;             // lista de cada tareas

static int escribir_a_proc(struct seq_file *file_proc, void *v) {       
    int running = 0;
    int sleeping = 0;
    int  zombie = 0;
    int stopped = 0;
    unsigned long ram;

    seq_printf(file_proc, "{\n\"processes\":[\n");
    // for_each_process macro para obtener los procesos 
    // cada iteración es un proceso
    for_each_process(task) {
        seq_printf(file_proc, "{\n");
        seq_printf(file_proc,"\"pid\":%d,\n",task->pid);
        seq_printf(file_proc,"\"name\":\"%s\",\n",task->comm);
        seq_printf(file_proc, "\"user\":\"%u\",\n",task->cred->uid.val);
        seq_printf(file_proc,"\"state\":%ld,\n",task->state);

        // % ram for process
        if (task->mm) {
            ram = get_mm_rss(task->mm) << PAGE_SHIFT; // bytes
            seq_printf(file_proc, "\"ram\": %lu,\n", ram);
        } else {
            seq_printf(file_proc, "\"ram\": %d,\n", 0);
        }

        // hijos    
        seq_printf(file_proc,"\"childs\":[\n");
        list_for_each(list, &task->children){
            task_child = list_entry(list, struct task_struct, sibling);
            seq_printf(file_proc, "{");
            seq_printf(file_proc,"\"id\":%d,",task_child->pid);
            seq_printf(file_proc,"\"name\":\"%s\"",task_child->comm);
            seq_printf(file_proc, "},");
        }
        seq_printf(file_proc,"]");
        
        switch(task->state){
            case 0:
                running++;
                break;
            case 1:
                sleeping++;
                break;
            case 4:
                zombie++;
                break;
            case 1026:
                sleeping++;
                break;
            default:
                stopped++;
                break;
        }
        seq_printf(file_proc, "},");
    }
    seq_printf(file_proc, "],\n");
    seq_printf(file_proc, "\"running\":%d,\n",running);
    seq_printf(file_proc, "\"sleeping\":%d,\n",sleeping);
    seq_printf(file_proc, "\"zombie\":%d,\n",zombie);
    seq_printf(file_proc, "\"stopped\":%d,\n",stopped);
    seq_printf(file_proc, "\"total_processes\":%d\n",(running+sleeping+zombie+stopped));
    seq_printf(file_proc,"}\n");
    return 0;
}

static int abrir_aproc(struct inode *inode, struct  file *file) {
  return single_open(file, escribir_a_proc, NULL);
}

static struct proc_ops archivo_operaciones = {    
    .proc_open = abrir_aproc,
    .proc_read = seq_read
};

static int __init modulo_init(void) {
    proc_create("cpu_201801480", 0, NULL, &archivo_operaciones);
    printk(KERN_INFO "Cristian Alexander Gomez Guzman\n");

    return 0;
}
 
static void __exit modulo_cleanup(void){
    remove_proc_entry("cpu_201801480", NULL);    
    printk(KERN_INFO "Diciembre 2021\n");
}

module_init(modulo_init);
module_exit(modulo_cleanup); 

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Cristian Gomez");
MODULE_VERSION("0.1");