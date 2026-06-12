import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-profile-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h3 class="text-xl font-bold text-amber-500 mb-6">Editar Informações</h3>
        
        <div class="space-y-4">
          <div>
            <label class="text-xs text-zinc-500 uppercase font-bold mb-1 block">Nome Completo</label>
            <input [(ngModel)]="tempDados.nome" class="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-500 transition text-white">
          </div>
          <div>
            <label class="text-xs text-zinc-500 uppercase font-bold mb-1 block">E-mail</label>
            <input [(ngModel)]="tempDados.email" class="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none focus:border-amber-500 transition text-white">
          </div>
        </div>

        <div class="flex gap-3 mt-8">
          <button (click)="close.emit()" class="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-bold transition">Cancelar</button>
          <button (click)="save.emit(tempDados)" class="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg font-bold transition shadow-lg shadow-amber-500/10">Salvar</button>
        </div>
      </div>
    </div>
  `
})
export class EditProfileModalComponent {
    @Input() dadosUsuario: any;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();

    tempDados: any;

    ngOnInit() {
        this.tempDados = { ...this.dadosUsuario };
    }
}