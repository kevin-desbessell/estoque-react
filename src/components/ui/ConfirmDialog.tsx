import Modal from "./Modal";
import Button from "./Button";

interface ConfirmDialogProps {
    aberto: boolean;
    titulo: string;
    mensagem: string;
    textoConfirmar?: string;
    carregando?: boolean;
    onConfirmar: () => void;
    onCancelar: () => void;
}

export default function ConfirmDialog({
    aberto,
    titulo,
    mensagem,
    textoConfirmar = "Confirmar",
    carregando = false,
    onConfirmar,
    onCancelar,
}: ConfirmDialogProps) {
    return (
        <Modal
            aberto={aberto}
            titulo={titulo}
            onFechar={onCancelar}
            rodape={
                <>
                    <Button variante="secondary" onClick={onCancelar} disabled={carregando}>
                        Cancelar
                    </Button>
                    <Button variante="danger" onClick={onConfirmar} carregando={carregando}>
                        {textoConfirmar}
                    </Button>
                </>
            }
        >
            <p>{mensagem}</p>
        </Modal>
    );
}
