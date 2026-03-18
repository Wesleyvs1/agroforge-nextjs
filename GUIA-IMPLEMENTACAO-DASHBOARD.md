# 🛠️ GUIA DE IMPLEMENTAÇÃO - Dashboard Admin AgroForge

Este guia mostra como estruturar o dashboard com exemplos de código.

---

## 📁 ESTRUTURA DE PASTAS

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx                 # Layout com sidebar
│   │   ├── page.tsx                   # Dashboard home
│   │   ├── login/page.tsx             # Tela de login
│   │   ├── produtos/
│   │   │   ├── page.tsx               # Listar produtos
│   │   │   ├── novo/page.tsx          # Criar novo
│   │   │   └── [id]/page.tsx          # Editar produto
│   │   ├── midia/page.tsx             # Gerenciar mídia
│   │   ├── customizacao/page.tsx      # Customizar cores/config
│   │   ├── blog/page.tsx              # Gerenciar blog
│   │   ├── fornecedores/page.tsx      # Gerenciar fornecedores
│   │   └── relatorios/page.tsx        # Relatórios
│   ├── components/
│   │   └── admin/
│   │       ├── Sidebar.tsx            # Menu lateral
│   │       ├── Header.tsx             # Header do admin
│   │       ├── ProductForm.tsx        # Form de produtos
│   │       ├── MediaUpload.tsx        # Upload de imagens
│   │       ├── ColorPicker.tsx        # Seletor de cores
│   │       ├── ConfirmModal.tsx       # Modal confirmação
│   │       ├── Toast.tsx              # Notificações
│   │       └── DataTable.tsx          # Tabela genérica
│   ├── context/
│   │   ├── AdminContext.tsx           # Context auth admin
│   │   └── AdminDataContext.tsx       # Context dados admin
│   ├── hooks/
│   │   ├── useAdmin.ts                # Hook autenticação
│   │   └── useAdminData.ts            # Hook dados
│   └── lib/
│       ├── adminAuth.ts               # Utilitários auth
│       ├── storage.ts                 # Gerenciar localStorage
│       └── validation.ts              # Validações
```

---

## 1️⃣ AUTENTICAÇÃO ADMIN

### Arquivo: `src/context/AdminContext.tsx`

```typescript
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'editor';
}

interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('admin_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    // TODO: Trocar por API real depois
    // Por enquanto, usar credenciais hardcoded
    if (username === 'admin' && password === 'admin@agroforge') {
      const adminUser: AdminUser = {
        id: '1',
        username: 'Admin',
        role: 'admin',
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de AdminProvider');
  }
  return context;
}
```

### Arquivo: `src/app/admin/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function LoginAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAdmin();

  if (isAuthenticated) {
    router.push('/admin');
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (login(username, password)) {
      router.push('/admin');
    } else {
      setError('Usuário ou senha incorretos');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">
          AgroForge Admin
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Acesse o painel de administração
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-gray-600 text-sm text-center mt-6">
          Credenciais temporárias:
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded">admin / admin@agroforge</code>
        </p>
      </div>
    </div>
  );
}
```

---

## 2️⃣ LAYOUT COM SIDEBAR

### Arquivo: `src/app/admin/layout.tsx`

```typescript
'use client';

import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
```

### Arquivo: `src/components/admin/Sidebar.tsx`

```typescript
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAdmin();

  const menuItems = [
    { href: '/admin', label: '📊 Dashboard', icon: '📊' },
    { href: '/admin/produtos', label: '📦 Produtos', icon: '📦' },
    { href: '/admin/midia', label: '🖼️ Mídia', icon: '🖼️' },
    { href: '/admin/customizacao', label: '🎨 Customização', icon: '🎨' },
    { href: '/admin/blog', label: '📝 Blog', icon: '📝' },
    { href: '/admin/fornecedores', label: '🤝 Fornecedores', icon: '🤝' },
    { href: '/admin/relatorios', label: '📈 Relatórios', icon: '📈' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-dark text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-secondary">
        <h1 className="text-2xl font-bold">AgroForge</h1>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 rounded-lg transition-colors ${
              isActive(item.href)
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-secondary'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-secondary space-y-2">
        <p className="text-sm text-gray-400">Logado como:</p>
        <p className="font-bold">{user?.username}</p>
        <button
          onClick={() => {
            logout();
            router.push('/admin/login');
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
```

---

## 3️⃣ GERENCIAMENTO DE PRODUTOS

### Arquivo: `src/context/AdminDataContext.tsx`

```typescript
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';

interface AdminDataContextType {
  products: any[];
  addProduct: (product: any) => void;
  updateProduct: (id: number, product: any) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => any;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState(initialProducts);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('agroforge_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error('Erro ao carregar produtos:', e);
      }
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('agroforge_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: any) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id: number, updatedProduct: any) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedProduct,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find((p) => p.id === id);
  };

  return (
    <AdminDataContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData deve ser usado dentro de AdminDataProvider');
  }
  return context;
}
```

### Arquivo: `src/app/admin/produtos/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAdminData } from '@/context/AdminDataContext';
import { formatCurrency } from '@/lib/whatsapp';

export default function ProdutosAdmin() {
  const { products, deleteProduct } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleDelete = (id: number) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Gerenciar Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-secondary transition-colors"
        >
          ➕ Novo Produto
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-bold">ID</th>
              <th className="px-6 py-4 text-left font-bold">Nome</th>
              <th className="px-6 py-4 text-left font-bold">Categoria</th>
              <th className="px-6 py-4 text-left font-bold">Preço</th>
              <th className="px-6 py-4 text-left font-bold">Estoque</th>
              <th className="px-6 py-4 text-left font-bold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/admin/produtos/${product.id}`}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ✏️ Editar
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    🗑️ Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Nenhum produto encontrado
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirmar Deleção</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-bold hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 4️⃣ FORM DE PRODUTO

### Arquivo: `src/app/admin/produtos/novo/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminData } from '@/context/AdminDataContext';

export default function NovoProduto() {
  const router = useRouter();
  const { addProduct } = useAdminData();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Café',
    price: '',
    description: '',
    detailedDescription: '',
    stock: '',
    image: '',
    rating: '0',
  });
  const [imagePreview, setImagePreview] = useState('');

  const categories = ['Café', 'Sementes', 'Ração', 'Adubos', 'Ferramentas', 'Defensivos'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImagePreview(imageUrl);
        setFormData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    addProduct({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 0,
    });

    alert('Produto criado com sucesso!');
    router.push('/admin/produtos');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Criar Novo Produto</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Nome */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Nome *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome do produto"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Categoria *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Preço */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Preço (R$) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="99.99"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Estoque */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Estoque</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Descrição Curta */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Descrição Curta</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição breve do produto"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Descrição Detalhada */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Descrição Detalhada</label>
          <textarea
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            placeholder="Descrição completa do produto"
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Imagem */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Imagem *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!imagePreview}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs max-h-48 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-white py-2 rounded-lg font-bold hover:bg-secondary transition-colors"
          >
            Salvar Produto
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/produtos')}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-bold hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
```

---

## 5️⃣ CUSTOMIZAÇÃO DE CORES

### Arquivo: `src/app/admin/customizacao/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function Customizacao() {
  const [colors, setColors] = useState({
    primary: '#27ae60',
    secondary: '#1e8449',
    dark: '#1a472a',
  });

  const [config, setConfig] = useState({
    companyName: 'AgroForge',
    email: 'contato@agroforge.com.br',
    whatsapp: '5543999998888',
    address: 'Almirante Tamandaré - PR',
  });

  // Carregar configurações salvas
  useEffect(() => {
    const savedColors = localStorage.getItem('site_colors');
    const savedConfig = localStorage.getItem('site_config');

    if (savedColors) setColors(JSON.parse(savedColors));
    if (savedConfig) setConfig(JSON.parse(savedConfig));
  }, []);

  // Salvar cores
  const handleColorChange = (colorKey: string, value: string) => {
    const newColors = { ...colors, [colorKey]: value };
    setColors(newColors);
    localStorage.setItem('site_colors', JSON.stringify(newColors));

    // Atualizar CSS do Tailwind (seria necessário recarregar ou usar CSS variables)
    alert('Cores salvas! Recarregue o site para ver as mudanças.');
  };

  // Salvar config
  const handleConfigChange = (key: string, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    localStorage.setItem('site_config', JSON.stringify(newConfig));
  };

  const handleSaveConfig = () => {
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Customização do Site</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CORES */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🎨 Cores</h2>

          {Object.entries(colors).map(([key, color]) => (
            <div key={key} className="mb-6">
              <label className="block font-bold text-gray-800 mb-2 capitalize">
                Cor {key}
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-20 h-10 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div
                className="mt-2 h-8 rounded-lg border border-gray-300"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}

          <button
            onClick={() => {
              setColors({ primary: '#27ae60', secondary: '#1e8449', dark: '#1a472a' });
              localStorage.setItem('site_colors', JSON.stringify({ primary: '#27ae60', secondary: '#1e8449', dark: '#1a472a' }));
              alert('Cores restauradas para padrão!');
            }}
            className="w-full mt-6 bg-gray-400 text-white py-2 rounded-lg font-bold hover:bg-gray-500 transition-colors"
          >
            Restaurar Cores Padrão
          </button>
        </div>

        {/* CONFIGURAÇÕES */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Configurações</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-gray-800 mb-2">Nome da Empresa</label>
              <input
                type="text"
                value={config.companyName}
                onChange={(e) => handleConfigChange('companyName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-2">Email</label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => handleConfigChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-2">WhatsApp</label>
              <input
                type="tel"
                value={config.whatsapp}
                onChange={(e) => handleConfigChange('whatsapp', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-2">Endereço</label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => handleConfigChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={handleSaveConfig}
              className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-secondary transition-colors"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 6️⃣ DASHBOARD HOME

### Arquivo: `src/app/admin/page.tsx`

```typescript
'use client';

import Link from 'next/link';
import { useAdminData } from '@/context/AdminDataContext';
import { useAdmin } from '@/context/AdminContext';

export default function DashboardHome() {
  const { products } = useAdminData();
  const { user } = useAdmin();

  const stats = [
    {
      label: 'Total de Produtos',
      value: products.length,
      icon: '📦',
      href: '/admin/produtos',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Categorias',
      value: new Set(products.map((p) => p.category)).size,
      icon: '🏷️',
      href: '/admin/produtos',
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Valor Total em Estoque',
      value: `R$ ${(
        products.reduce((sum, p) => sum + p.price * p.stock, 0)
      ).toFixed(2)}`,
      icon: '💰',
      href: '/admin/produtos',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Produtos sem Estoque',
      value: products.filter((p) => p.stock === 0).length,
      icon: '⚠️',
      href: '/admin/produtos',
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Bem-vindo, {user?.username}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Aqui você gerencia todos os aspectos do site AgroForge
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            href={stat.href}
            className={`${stat.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-sm opacity-75">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Atalhos Rápidos */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">⚡ Atalhos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/produtos/novo"
            className="block bg-primary text-white p-4 rounded-lg hover:bg-secondary transition-colors text-center font-bold"
          >
            ➕ Novo Produto
          </Link>
          <Link
            href="/admin/midia"
            className="block bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-bold"
          >
            🖼️ Upload de Imagem
          </Link>
          <Link
            href="/admin/customizacao"
            className="block bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center font-bold"
          >
            🎨 Customizar Cores
          </Link>
        </div>
      </div>

      {/* Últimos Produtos */}
      <div className="bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Últimos Produtos</h2>
        <div className="space-y-2">
          {products.slice(-5).reverse().map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
              <Link
                href={`/admin/produtos/${product.id}`}
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                Editar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 📝 PRÓXIMOS PASSOS

1. **Crie a estrutura básica** com os arquivos acima
2. **Implemente a autenticação** (AdminContext)
3. **Implemente o CRUD de produtos** (AdminDataContext)
4. **Adicione upload de imagens**
5. **Implemente customização de cores**
6. **Adicione outras funcionalidades** (Blog, Fornecedores, etc)

---

## 🎯 CHECKLIST

- [ ] AdminContext criado e funcionando
- [ ] Tela de login protegida
- [ ] CRUD de produtos completo
- [ ] Upload de imagens
- [ ] Customização de cores
- [ ] Sidebar navegável
- [ ] Dashboard com estatísticas
- [ ] Toasts/Notificações
- [ ] Validações de form
- [ ] Responsivo em mobile
- [ ] localStorage persistindo dados
- [ ] Pronto para expandir com BD

---

**Este é um guia prático. Adapte conforme necessário para seu projeto!** 🚀
