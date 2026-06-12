import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-delete-account-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-zinc-900 border border-rose-900/30 w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div class="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
          ⚠️
        </div>
        <h3 class="text-xl font-bold text-white text-center mb-2">Excluir Conta?</h3>
        <p class="text-zinc-500 text-center text-sm mb-8">
          Esta ação é irreversível. Todos os seus dados financeiros e histórico de criptos serão apagados para sempre.
        </p>

        <div class="flex flex-col gap-3">
          <button (click)="confirmarExclusao()" class="w-full px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition">
            Sim, excluir minha conta
          </button>
          <button (click)="close.emit()" class="w-full px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg font-bold transition">
            Mudei de ideia
          </button>
        </div>
      </div>
    </div>
  `
})
export class DeleteAccountModalComponent {
    @Output() close = new EventEmitter<void>();

    confirmarExclusao() {
        console.log('Conta excluída!');
    }
}