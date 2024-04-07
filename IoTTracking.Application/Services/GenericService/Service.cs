using AutoMapper;
using IoTTracking.Application.DTOs.Interfaces;
using IoTTracking.Application.RepositoryInterfaces;
using IoTTracking.Application.Services.GenericService.Interfaces;
using IoTTracking.Core.Entities.Interfaces;

namespace IoTTracking.Application.Services.GenericService
{
	public abstract class Service<TEntity, TDto> : IService<TEntity, TDto>
	where TEntity : class, IEntity
	where TDto : class, IEntityDTO
	{
		protected readonly IRepository<TEntity> _repository;
		protected readonly IUnitOfWork _unitOfWork;
		protected readonly IMapper _mapper;


		public Service(
			IRepository<TEntity> repository,
			IUnitOfWork unitOfWork,
			IMapper mapper)
		{
			_repository = repository;
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public virtual async Task<TDto> GetById(int id)
		{
			var entity = await _repository.GetByIdAsync(id);
			return _mapper.Map<TDto>(entity);
		}

		protected virtual List<TDto> EntityToDTO(List<TEntity> entities)
		{
			return entities.Select(entity => _mapper.Map<TDto>(entity)).ToList();
		}

		public virtual async Task<List<TDto>> GetAll()
		{
			var entities = _repository.GetAll();
			List<TEntity> list = entities.ToList();
			return EntityToDTO(list);
		}

		public virtual async Task<TDto> Add(TDto dto)
		{
			var entity = _mapper.Map<TEntity>(dto);
			var added = await _repository.AddAsync(entity);
			await _unitOfWork.SaveChangesAsync();
			return _mapper.Map<TDto>(added);
		}

		public virtual async Task<TDto> Update(TDto dto)
		{
			var entity = _mapper.Map<TEntity>(dto);
			var updated = _repository.Update(entity);
			await _unitOfWork.SaveChangesAsync();
			return _mapper.Map<TDto>(updated);
		}

		public virtual async Task Delete(int id)
		{
			var entity = await _repository.GetByIdAsync(id) ?? throw new Exception("Entity not found");
			entity = _repository.SetEntityNoTracking(entity);
			_repository.Delete(entity);
			await _unitOfWork.SaveChangesAsync();
		}

		public virtual int? GetEntityId(TDto dto)
		{
			return dto.Id;
		}
	}
}
